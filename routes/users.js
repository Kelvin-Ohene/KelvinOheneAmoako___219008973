const express = require('express')
const app = express()
const ObjectId = require('mongodb').ObjectId


app.get('/list', function(req, res, next) {

    req.db.collection('patient').find().sort({ "_id": -1 }).toArray(function(err, result) {

        if (err) {
            req.flash('error', err)
            res.render('user/list', {
                title: 'User List',
                data: ''
            })
        } else {

            res.render('user/list', {
                title: 'User List',
                data: result
            })
        }
    })
})

app.get('/payy', function(req, res, next) {

    req.db.collection('payment').find().sort({ "_id": -1 }).toArray(function(err, result) {

        if (err) {
            req.flash('error', err)
            res.render('user/payyment', {
                title: 'Payment List',
                data: ''
            })
        } else {

            res.render('user/payyment', {
                title: 'Payment List',
                data: result
            })
        }
    })
})

app.get('/inputdetails', (req, res) => {
    res.render("inputdetails")
});

app.get('/pay', (req, res) => {
    res.render("pay")
});


app.get('/edit/(:id)', function(req, res, next) {
    const o_id = new ObjectId(req.params.id)
    req.db.collection('patient').find({ "_id": o_id }).toArray(function(err, result) {
        if (err) return console.log(err)


        if (!result) {
            req.flash('error', 'User not found with id = ' + req.params.id)
            res.redirect('/users')
        } else {
            res.render('user/edit', {
                title: 'Edit User',

                id: result[0]._id,
                fname: result[0].fname,
                lname: result[0].lname,
                num: result[0].num,
                dob: result[0].dob,
                address: result[0].address,
                enum: result[0].enum
            })
        }
    })
})

// EDIT USER POST ACTION
app.put('/edit/(:id)', function(req, res, next) {


    if (!errors) {
        const user = {
            fname: req.sanitize('fname').escape().trim(),
            lname: req.sanitize('lname').escape().trim(),
            num: req.sanitize('num').escape().trim(),
            dob: req.sanitize('dob').escape().trim(),
            address: req.sanitize('address').escape().trim(),
            enum: req.sanitize('enum').escape().trim()
        }

        const o_id = new ObjectId(req.params.id)
        req.db.collection('patient').update({ "_id": o_id }, user, function(err, result) {
            if (err) {
                req.flash('error', err)


                res.render('user/edit', {
                    title: 'Edit User',
                    id: req.params.id,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    dob: req.body.dob,
                    address: req.body.address,
                    enum: req.body.enum
                })
            } else {
                req.flash('success', 'Data updated successfully!')

                res.redirect('/users')


            }
        })
    } else {
        const error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)


        res.render('user/edit', {
            title: 'Edit User',
            id: req.params.id,
            fname: req.body.fname,
            lname: req.body.lname,
            dob: req.body.dob,
            address: req.body.address,
            enum: req.body.enum
        })
    }
})


app.delete('/delete/(:id)', function(req, res, next) {
    const o_id = new ObjectId(req.params.id)
    req.db.collection('patient').remove({ "_id": o_id }, function(err, result) {
        if (err) {
            req.flash('error', err)
                // redirect to users list page
            res.redirect('/users')
        } else {
            req.flash('success', 'User deleted successfully! id = ' + req.params.id)
                // redirect to users list page
            res.redirect('/users/list')
        }
    })
})

module.exports = app