class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options:"i",
            }
        } : {};
        // console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    //For Category & Price & Rating
    filter(){  
        const queryCopy = {...this.queryStr};
        // console.log(queryCopy);

        //Removing some feilds for category from queryStr input
        const removefields = ["keyword","page","limit"];
        removefields.forEach((key) =>delete queryCopy[key]);

        //Filter for Price & Rating
        // console.log(queryCopy);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key =>`$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        // console.log(queryCopy);
        return this;
    }

    //For Each Page only 5 Items will display
    pagination(resultPerPage){
        const currPage = Number(this.queryStr.page) || 1;
        //For Particular page we are skipping some items from Starting
        const skipitems = resultPerPage * (currPage-1);
        this.query = this.query.limit(resultPerPage).skip(skipitems);
        return this;
    }
    
}
module.exports = ApiFeatures;