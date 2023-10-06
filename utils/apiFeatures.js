class APIFeatures{
    constructor(query, queryString){
      this.query = query;
      this.queryString = queryString;
    }
    filter(){
      // 1A) FILTERING
      const queryObj = {...this.queryString}
      const exludedFields = ["page", "sort", "limit", "fields"]
      exludedFields.forEach(element => delete queryObj[element])
  
  
      // example query for greater than or equal operator
      /// { price: {$gte: 500 }}
  
      // 1B) ADVANCED FILTERING
  
      let queryStr = JSON.stringify(queryObj)
      queryStr = queryStr.replace(/\bgte|gt|lte|lt\b/g, match => `$${match}`)
      
      this.query = this.query.find(JSON.parse(queryStr))
  
      return this;
    }
    sort(){
      // 2) SORTING
      if(this.queryString.sort){
        const sortBy = this.queryString.sort.split(",").join(" ")
        this.query = this.query.sort(sortBy)
      } else {
        this.query = this.query.sort("-createdAt")
      }
      return this;
    }
    limitFields(){
      if(this.queryString.fields){
        const fields = this.queryString.fields.split(",").join(" ")
        this.query = this.query.select(fields)
      } else {
        // excluding __v parameter
        this.query = this.query.select("-__v")
      }
      return this;
    }
    paginate(){
      const page = this.queryString.page * 1 || 1; 
      const limit = this.queryString.limit * 1 || 1;
      const skip = (page - 1) * limit;
      // * 1 converts string to int, || 1 is default
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
  
  
      
    }
  }

module.exports = APIFeatures;