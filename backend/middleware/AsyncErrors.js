module.exports = currfunc =>(req,res,next)=>{
    Promise.resolve(currfunc(req,res,next))
    .catch(next);
}