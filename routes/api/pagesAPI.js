const express = require('express');
const router = express.Router();
const root_path = process.cwd();


// Set up connection to database
const db = require('../../db/db');
db.setUpConnection();


// Models
const Page = require('../../db/models/Page');



// Helpers
const fileHelper = require('../../utils/fileHelper');



router.get("/list", async (req, res) => {
    let { sort, limit, page } = req.query;

    //Convert
    limit = limit ? Number(limit): 0;
    page = page ? Number(page): 0;


    // Find {}
    let findData = req.query;
    delete findData.limit;
    delete findData.page;
    delete findData.sort;


    console.log('>> Find Data', findData);
    console.log('>> param', {page,
        limit,
        skip:limit * page
    });


    let sortParam ={createdDate: 'desc'};

    Page.find(findData)
        .limit(limit)
        .skip(limit * page)
        .sort(sortParam)
        .exec(async (err, data) => {
            if (err) {
                console.log(err, "err");
                return res.send(err);
            }else{
                const total = await Page.countDocuments(findData);

                return res.send({
                    items:data,
                    total
                });
            }
        });
});


// Single Page
router.get("/:id", async (req, res) => {
    let { id } = req.params;
    console.log('>>> GET Page',req.params );


    Page.findOne({_id: id})
        .populate('collections', '_id title')
        .exec(async (err, data) => {
            if (err) {
                console.log('err', err);
                return res.status(500).json(err);
            } else {
                return res.send(data);
            }
        });
});



// Create/Update Record
router.post("/", async (req, res, next) => {
    console.log(">>> POST /Page", req.body );
    let { _id,   title, description, showOnMenu, showOnFront  } = req.body;



    // Required fields
    if(!title) return res.send(500, { error: 'title is required' });


    let newData = {
        title,
        description,
        showOnMenu: showOnMenu !=null ? showOnMenu : false,
        showOnFront: showOnFront !=null ? showOnFront : false
    };

    let pageRecord = _id ? await Page.findOne({_id}) : await new Page(newData).save();
    console.log(">>>> pageRecord", pageRecord);



    // Update
    pageRecord.update(newData,  (err, doc)=>{
        if (err) {
            console.log("POST /page err", err );
            return res.send(500, { error: err });
        }else{
            return res.send(doc);
        }
    });
});


// Delete record
router.delete("/:id", async (req, res, next) => {
    console.log('>>> DELETE Page', req.params );
    let { id } = req.params;

    // Remove Page folder
    let pageFolder= `/static/uploads/pages/${id}`;
    fileHelper.deleteFolderRecursivelly(pageFolder);



    Page.findOneAndRemove({ _id: id },(err, rec)=>{
         if (err) return res.send(500, { error: err });
         return res.send({
             status:"Success",
             removerCollections:removeReq.deletedCount
         });
    });
});










module.exports = router;