<template>
  <div class="data-table">
    <!-- Barre de recherche -->
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher..."
        class="search-input"
      />
      <div class="search-info">
        {{ filteredData.length }} / {{ data.length }} résultats
      </div>
    </div>

    <!-- Tableau -->
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              @click="handleSort(column.key)"
              :class="{ 'sortable': true, 'sorted': sortColumn === column.key }"
            >
              {{ column.label }}
              <span class="sort-icon">
                <span v-if="sortColumn === column.key">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
                <span v-else>↕</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="index" class="table-row">
            <td v-for="column in columns" :key="column.key" class="table-cell">
              <span v-if="column.type === 'custom' && column.render">
                <!-- Rendu personnalisé -->
                <component
                  :is="column.render"
                  :value="getNestedValue(item, column.key)"
                  :item="item"
                />
              </span>
              <span v-else>
                {{ formatCellValue(getNestedValue(item, column.key), column.type) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Message si aucune donnée -->
      <div v-if="filteredData.length === 0" class="no-data">
        <p>Aucune donnée trouvée</p>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        @click="currentPage = 1"
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        ⏮
      </button>
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        ◀
      </button>
      
      <span class="pagination-info">
        Page {{ currentPage }} sur {{ totalPages }}
      </span>
      
      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        ▶
      </button>
      <button
        @click="currentPage = totalPages"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        ⏭
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'DataTable',
  props: {
    // Liste des données à afficher
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    // Configuration des colonnes
    columns: {
      type: Array,
      required: true,
      validator: (columns) => {
        return columns.every(col => col.key && col.label)
      }
    },
    // Nombre d'éléments par page
    itemsPerPage: {
      type: Number,
      default: 10
    },
    // Tri initial
    defaultSort: {
      type: Object,
      default: () => ({ column: null, direction: 'asc' })z
    }
  },
  setup(props) {
    // État de recherche
    const searchQuery = ref('')
    
    // État de tri
    const sortColumn = ref(props.defaultSort.column)
    const sortDirection = ref(props.defaultSort.direction)
    
    // État de pagination
    const currentPage = ref(1)

    // Fonction pour récupérer une valeur imbriquée (ex: user.name)
    const getNestedValue = (obj, path) => {
      return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : ''
      }, obj)
    }

    // Données filtrées par recherche
    const filteredData = computed(() => {
      if (!searchQuery.value) return props.data

      const query = searchQuery.value.toLowerCase()
      return props.data.filter(item => {
        return props.columns.some(column => {
          const value = getNestedValue(item, column.key)
          return String(value).toLowerCase().includes(query)
        })
      })
    })

    // Données triées
    const sortedData = computed(() => {
      if (!sortColumn.value) return filteredData.value

      const sorted = [...filteredData.value].sort((a, b) => {
        const aValue = getNestedValue(a, sortColumn.value)
        const bValue = getNestedValue(b, sortColumn.value)

        // Gestion des différents types
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue
        }

        if (aValue instanceof Date && bValue instanceof Date) {
          return sortDirection.value === 'asc' 
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime()
        }

        // Tri alphabétique par défaut
        const aStr = String(aValue).toLowerCase()
        const bStr = String(bValue).toLowerCase()
        
        if (sortDirection.value === 'asc') {
          return aStr.localeCompare(bStr)
        } else {
          return bStr.localeCompare(aStr)
        }
      })

      return sorted
    })

    // Pagination
    const totalPages = computed(() => {
      return Math.ceil(sortedData.value.length / props.itemsPerPage)
    })

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * props.itemsPerPage
      const end = start + props.itemsPerPage
      return sortedData.value.slice(start, end)
    })

    // Gestion du tri
    const handleSort = (columnKey) => {
      if (sortColumn.value === columnKey) {
        // Inverser la direction si on clique sur la même colonne
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
      } else {
        // Nouvelle colonne
        sortColumn.value = columnKey
        sortDirection.value = 'asc'
      }
      
      // Retourner à la première page
      currentPage.value = 1
    }

    // Formatage des valeurs de cellule
    const formatCellValue = (value, type) => {
      if (value === null || value === undefined) return '-'
      
      switch (type) {
        case 'date':
          return new Date(value).toLocaleDateString('fr-FR')
        case 'datetime':
          return new Date(value).toLocaleString('fr-FR')
        case 'currency':
          return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
          }).format(value)
        case 'number':
          return new Intl.NumberFormat('fr-FR').format(value)
        case 'boolean':
          return value ? 'Oui' : 'Non'
        default:
          return String(value)
      }
    }

    // Réinitialiser la page quand les données changent
    watch([searchQuery], () => {
      currentPage.value = 1
    })

    return {
      searchQuery,
      sortColumn,
      sortDirection,
      currentPage,
      filteredData,
      paginatedData,
      totalPages,
      handleSort,
      getNestedValue,
      formatCellValue
    }
  }
}
</script>

<style scoped>
.data-table {
  width: 100%;
  background: white;
  border-radius: 1vh;
  box-shadow: 0 0.5vh 2vh rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.search-bar {
  padding: 2vh 3vw;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2vw;
}

.search-input {
  flex: 1;
  padding: 1vh 1.5vw;
  border: 1px solid #ced4da;
  border-radius: 0.5vh;
  font-size: 2vh;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2vh rgba(52, 152, 219, 0.25);
}

.search-info {
  font-size: 1.8vh;
  color: #6c757d;
  white-space: nowrap;
}

.table-container {
  max-height: 60vh;
  overflow-y: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead {
  background: #f8f9fa;
  position: sticky;
  top: 0;
  z-index: 10;
}

.table th {
  padding: 2vh 2vw;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
  font-size: 2vh;
}

.table th.sortable {
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
}

.table th.sortable:hover {
  background-color: #e9ecef;
}

.table th.sorted {
  background-color: #e3f2fd;
  color: var(--primary-color);
}

.sort-icon {
  margin-left: 0.5vw;
  font-size: 1.6vh;
  opacity: 0.6;
}

.table th.sorted .sort-icon {
  opacity: 1;
}

.table-row {
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: #f8f9fa;
}

.table-row:nth-child(even) {
  background-color: #fdfdfd;
}

.table-cell {
  padding: 1.5vh 2vw;
  border-bottom: 1px solid #e9ecef;
  font-size: 1.9vh;
  color: #495057;
}

.no-data {
  padding: 4vh 0;
  text-align: center;
  color: #6c757d;
  font-size: 2vh;
}

.pagination {
  padding: 2vh 3vw;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;
}

.pagination-btn {
  padding: 1vh 1.5vw;
  border: 1px solid #ced4da;
  background: white;
  border-radius: 0.5vh;
  cursor: pointer;
  font-size: 1.8vh;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 1.8vh;
  color: #495057;
  margin: 0 2vw;
}

/* Responsive */
@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    gap: 1vh;
  }
  
  .search-info {
    align-self: flex-end;
  }
  
  .table th,
  .table-cell {
    padding: 1vh 1vw;
    font-size: 1.7vh;
  }
  
  .pagination {
    flex-wrap: wrap;
  }
}
</style>
