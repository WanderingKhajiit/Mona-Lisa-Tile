const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const jobService = require("./router.service")

const VALID_PROPERTIES = [
    "job_id",
    "neighborhood",
    "picture",
    "worker",
    "date"
]

function hasOnlyValidProperties(req, res, next){
    const { data = {} } = req.body;
    const invalidFields = Object.keys(data).filter(
        (field) => !VALID_PROPERTIES.includes(field)
      );
      if(invalidFields.length){
        return next({
            status: 400,
            message: `Invalid field(s): ${invalidFields.join(", ")}`,
          });
        }
        next();
}
async function jobExists(req, res, next) {
    const { job_id } = req.params;
    
    //console.log(job_id)
    if(!isNaN(job_id)){
      const job = await jobService.read(Number(job_id));
      if (job) {
        res.locals.job = job;
        
        return next();
    }
    next({
      status: 404,
      message: "Job listing cannot be found.",
    });
    }else{
      console.error("Job id is not a number");
    }
    
  }
async function list(req, res){
    const data = await jobService.list()
    res.json({ data })
}

async function create(req, res){
    const data = await jobService.create(req.body.data);
    res.status(201).json({ data })
}

async function read(req, res){
    // console.log(res.locals.job)
    res.status(201).json({ data: res.locals.job })
}

async function destroy(res, req, next){
  //console.log(res.locals.job)
    const { job_id } = res.params
    console.log(job_id)
    await jobService.destroy(Number(job_id));
    
}

async function update(req, res){
  
  //console.log(job_id)
  console.log(req.body.data)
  const updatedJob = {
    ...req.body.data,
    
  };
  const data = await jobService.update(updatedJob);
  res.status(200).json({ data })

}

module.exports = {
    list,
    read: [jobExists, asyncErrorBoundary(read)],
    create: [hasOnlyValidProperties, create],
    delete: [jobExists, asyncErrorBoundary(destroy)],
    update: [jobExists, asyncErrorBoundary(update)]
}