

const testTable = [{
    id: 1,
    name: "Chris"
}]


console.log(testTable)



const index = testTable.findIndex(e => e.id === 1);
console.log(index)

const newTable = testTable.splice(index, 1);
console.log(testTable)