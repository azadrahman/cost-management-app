export const costTableHead = [
    { id: 'costTitle', label: 'Cost Title' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'cost', label: 'Cost' },
    { id: 'date', label: 'Entry Date' },
    { id: 'actions', label: 'Actions', disableSorting: true }
  ];
  
  const KEYS ={
    costs:'costs',
    costId:'costId'
  }
  
  export function addCost(data) {
    let costs=getAllCosts();
    data['id'] = generateCostId()
    costs.push(data)
    localStorage.setItem(KEYS.costs,JSON.stringify(costs))
  }
  
  export function updateCost(data) {
    let costs = getAllCosts();
    let recordIndex = costs.findIndex(x => x.id === data.id);
    costs[recordIndex] = { ...data }
    localStorage.setItem(KEYS.costs, JSON.stringify(costs));
  }
  
  export function deleteCost(id) {
    let costs = getAllCosts();
    costs = costs.filter(x => x.id !== id)
    localStorage.setItem(KEYS.costs, JSON.stringify(costs));
  }
  
  export function generateCostId() {
    if (localStorage.getItem(KEYS.costId) == null){
      localStorage.setItem(KEYS.costId, '0')
    }
    var id = parseInt(localStorage.getItem(KEYS.costId))
    localStorage.setItem(KEYS.costId, (++id).toString())
    return id;
  }
  
  export function getAllCosts() {
    if (localStorage.getItem(KEYS.costs) == null){
      localStorage.setItem(KEYS.costs, JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem(KEYS.costs));
  }