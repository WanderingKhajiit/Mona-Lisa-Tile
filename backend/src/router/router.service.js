const knex = require("../../connection.js")

function list(){
    return knex("jobs")
    .select("*")
    .orderBy("date")
}

function read(job_id){
    return knex("jobs")
    .select("*")
    .where({ job_id })
    //.then(console.log(jobId))
}
function create(job){
    return knex("jobs")
    .insert(job)
    .returning("*")
    .then((createdRecords) => createdRecords[0])
}

function destroy(job_id){
    return knex("jobs")
    .where({ job_id }).del()
}

function update(updatedJob){
    //console.log(updatedJob)
    return knex("jobs")
        .select("*")
        .where({ job_id: updatedJob.job_id })
        .update(updatedJob, "*")
        .returning("*")  
}

module.exports = {
    list,
    create,
    read,
    destroy,
    update
}