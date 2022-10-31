var Userdb = require('../model/model');


// create and save a new user 

exports.create=(req,res)=>{
    //validates request 
    if(!req.body){
        res.status(400).send({
            message: 'content can not be empty'
        });
        return;
    }

    // new user create 
const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
});

// save user in the database 

user 
.save(user)
.then(data=>{
    
    
    res.redirect('/add-user')
})
.catch(err=>{
    res.status(500).send({
        message: err.message || 'some error occured while creating a create user operation'
        
    });
    console.log(err);
});

}


// retrive and return of  all user / retrive and return of  a single  user 
exports.find=(req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
            res.status(404).send({message:'not found user with id ' + id})
            }else{
                res.send(data)
            }

        })
        .catch(err=>{
            res.status(500).send({message:'error retrieving user with id ' + id })
        })

    }else{

    

    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({messege: err.message ||'error occur while retriving user information'})
       
    })

}
}


// update a new identified user by user id 
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id 
exports.delete=(req,res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`can not delete with id ${id}.may be id is wrong`})

        }else{
            res.send({
                message:'User was deleted successfuly'
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            messege: 'could not delete User with id=' + id
        });
    });



}





