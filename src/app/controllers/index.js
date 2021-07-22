const mongoose = require('mongoose');
const validUrl = require('valid-url')
const shortid = require('shortid')
const _ = require('lodash');
const models = require("../../models");

const BASE_URL = process.env.BASE_URL || "http://localhost:9000/api/v1";


exports.create = async (req, res)=>{
    // #swagger.start
    // #swagger.tags = ['url']
    /*  #swagger.parameters['parameter_name'] = {
                in: 'body',
                description: 'This endpoin accepts only valid url',
                schema: {
                    $longUrl: 'http://google.com',
                }
        } 
    */
    const {longUrl} = req.body;
    if (!validUrl.isUri(BASE_URL)) {
        /* #swagger.responses[403] = {
                    description: 'Base Url suspected not to be valid',
                    schema: { $error: 'Invalid shortening domain' }
            } 
        */
        return res.status(403).json({error:'Invalid shortening domain'})
    }
    if (!validUrl.isUri(longUrl)) {
        /* #swagger.responses[402] = {
                    description: 'input Url suspected not to be valid',
                    schema: { $error: 'url to shortening must be valid' }
            } 
        */
        return res.status(402).json({error:'url to shortening must be valid'})
    }
    //generate short code
    const urlCode = shortid.generate()
    const shortUrl = `${BASE_URL}/${urlCode}`;
    const count = 0;
    const url = new models({longUrl, urlCode, shortUrl, count, created_at:new Date()});
    await url.save((err, data)=>{
        if(err || !data){
            /* #swagger.responses[401] = {
                    description: 'failed to shortening url',
                    schema: { $error: 'error to create short url' }
                } 
            */
            return res.status(401).json({error:"error to create short url", err})
        }
        /* #swagger.responses[200] = {
                    description: 'successfully shortening url',
                    schema: { $message: 'short url successfully created', $data:{

                    } }
                } 
        */
        res.status(200).json({message:"short url successfully created", data})
    });
}

exports.urlById = async (req, res, next, id)=>{
        // #swagger.start
       // #swagger.tags = ['url']
       /*
            #swagger.parameters['parameter_name'] = {
                in: 'query',
                description: 'This endpoin accepts only valid url',
                schema: {
                    $urlCode: 'bbnaija',
                }
            }
        */
    const data = await models.findOne({urlCode:id}) //.exec()

    if(!data){
        /* #swagger.responses[404] = {
                    description: 'failed to shortening url',
                    schema: { $error: 'url is not found' }
                } 
            */
        return res.status(404).json({error:"url is not found"})
    }
    req.url = data
    next();
}

exports.urlList = async (req, res) =>{
    // #swagger.start
    // #swagger.tags = ['url']
    const data = await models.find();
    if(!data){
        /* #swagger.responses[404] = {
                    description: 'failed to shortening url',
                    schema: { $error:"failed to fetched url" }
                } 
        */
        return res.status(404).json({error:"failed to fetched url"})
    }

    /* #swagger.responses[200] = {
                    description: 'URL list ',
                    schema: {
                        "message": "url fetched",
                        "data": [
                            {
                                "count": 3,
                                "_id": "60f60348b2a9211548a80fd1",
                                "longUrl": "https://noblesoftsolution.com",
                                "urlCode": "bbnaija",
                                "shortUrl": "http://localhost:9000/api/v1/bbnaija",
                                "created_at": "2021-07-19T22:57:12.396Z",
                                "visitor": [
                                    {
                                        "click": 1,
                                        "_id": "60f60d23f8f927340cf8e041",
                                        "date": "2021-07-19T23:39:15.441Z"
                                    }
                                ],
                                "__v": 3,
                                "updated_at": "2021-07-20T01:26:05.000Z"
                            }
                        ]
                    }
                } 
    */
    return res.status(200).json({message:"url fetched", data})
}

exports.url = async (req, res)=>{
    // #swagger.start
    // #swagger.tags = ['url']
    const url = req.url;
    if(!url){
        /* #swagger.responses[404] = {
                    description: 'failed to shortening url',
                    schema: { $error: 'url is not found' }
                } 
        */
        return res.status(404).json({error:"url is not found", url})
    }
    url.count++
    url.visitor = [{ date:new Date(), click:+1 }]
    await url.save()
    return res.status(200).redirect(url.longUrl)
}
exports.detailOfUrl = async (req, res)=>{
    // #swagger.start
    // #swagger.tags = ['url']
    const url = req.url;
    if(!url){
        /* #swagger.responses[404] = {
                    description: 'failed to shortening url',
                    schema: { $error: 'url is not found' }
                } 
            */
        return res.status(404).json({error:"url is not found", url})
    }

    /* #swagger.responses[200] = {
        description: 'URL list ',
        schema: {
            "message": "url fetched",
            "data": {
                "count": 3,
                "_id": "60f60348b2a9211548a80fd1",
                "longUrl": "https://noblesoftsolution.com",
                "urlCode": "bbnaija",
                "shortUrl": "http://localhost:9000/api/v1/bbnaija",
                "created_at": "2021-07-19T22:57:12.396Z",
                "visitor": [
                    {
                        "click": 1,
                        "_id": "60f60d23f8f927340cf8e041",
                        "date": "2021-07-19T23:39:15.441Z"
                    }
                ],
                "__v": 3,
                "updated_at": "2021-07-20T01:26:05.000Z"
            }
                        
        } 
    }
    */
    res.status(200).json({message:"url fetched", data:url})
}

exports.updateUrl = async (req, res)=>{
    // #swagger.start
    // #swagger.tags = ['url']

    /*  #swagger.parameters['parameter_name'] = {
                in: 'body',
                description: 'This endpoin accepts only valid url',
                schema: {
                    $longUrl: 'http://google.com',
                }
        } 
    */
    const {longUrl} = req.body
    if (!validUrl.isUri(longUrl)) {
         /* #swagger.responses[402] = {
                    description: 'Url must be valid',
                    schema: { $error: 'Invalid shortening url' }
            } 
        */
        return res.status(402).json({error:'url to shortening must be valid'})
    }
    let url = _.extend(req.url, {longUrl})
    url.updated_at = Date();
    url.save((err, data)=>{
        if(err || !data){
             /* #swagger.responses[400] = {
                    description: 'Url must be valid',
                    schema: { $error: 'failed to update url' }
            } 
        */
            return res.status(400).json({error:"failed to update url"})
        }

    /* #swagger.responses[200] = {
        description: 'update long url',
        schema: {
            "message": "url updated",
            "data": {
                "count": 3,
                "_id": "60f60348b2a9211548a80fd1",
                "longUrl": "https://noblesoftsolution.com",
                "urlCode": "bbnaija",
                "shortUrl": "http://localhost:9000/api/v1/bbnaija",
                "created_at": "2021-07-19T22:57:12.396Z",
                "visitor": [
                    {
                        "click": 1,
                        "_id": "60f60d23f8f927340cf8e041",
                        "date": "2021-07-19T23:39:15.441Z"
                    }
                ],
                "__v": 3,
                "updated_at": "2021-07-20T01:26:05.000Z"
            }
                        
        } 
    }
    */

        res.status(200).json({message:"url updated", data})
    })
}

exports.deleteUrl = async (req, res)=>{
    // #swagger.start
    // #swagger.tags = ['url']
    const url = req.url;
    url.remove((err, data)=>{
        if(err || !data){
            /* #swagger.responses[405] = {
                    description: 'Failed to delete url',
                    schema: { $error: 'failed to deleteurl' }
            } 
        */
            return res.status(405).json({error:"failed to delete url", err})
        }

        /* #swagger.responses[200] = {
        description: 'delete url url',
        schema: {
            "message": "url deleted",
            "data": {
                "count": 3,
                "_id": "60f60348b2a9211548a80fd1",
                "longUrl": "https://noblesoftsolution.com",
                "urlCode": "bbnaija",
                "shortUrl": "http://localhost:9000/api/v1/bbnaija",
                "created_at": "2021-07-19T22:57:12.396Z",
                "visitor": [
                    {
                        "click": 1,
                        "_id": "60f60d23f8f927340cf8e041",
                        "date": "2021-07-19T23:39:15.441Z"
                    }
                ],
                "__v": 3,
                "updated_at": "2021-07-20T01:26:05.000Z"
            }
                        
        } 
        }
        */
        res.status(200).json({message:"url successfully deleted", data})
    })

}

exports.customUrl = async (req, res)=>{
    // #swagger.start
    // #swagger.tags = ['url']
    /*  
    #swagger.parameters['parameter_name'] = {
                in: 'body',
                description: 'This endpoin accepts only valid url',
                schema: {
                    $urlCode: 'bbnaija',
                }
        } 
    */
    const {urlCode} = req.body;
    const resp = await models.findOne({urlCode});
    console.log(resp)
    if(resp){
        /* #swagger.responses[405] = {
                    description: 'url code not available, choose another unique code',
                    schema: {$error:"url code is not available, choose another code"}
            } 
        */
        return res.status(401).json({error:"url code is not available, choose another code"})
    }
    const shortUrl = `${BASE_URL}/${urlCode}`;
    let url = _.extend(req.url, {urlCode, shortUrl});
    url.save((err, data)=>{
        if(err || !data){
            /* #swagger.responses[400] = {
                    description: 'failed to create custome url, please try again',
                    schema: {$error:"faile to create custom url"}
            } 
            */
            return res.status(400).json({error:"faile to create custom url"})
        }
        
        /* #swagger.responses[200] = {
        description: 'delete url url',
        schema: {
            "message": "custome url created",
            "data": {
                "count": 3,
                "_id": "60f60348b2a9211548a80fd1",
                "longUrl": "https://noblesoftsolution.com",
                "urlCode": "bbnaija",
                "shortUrl": "http://localhost:9000/api/v1/bbnaija",
                "created_at": "2021-07-19T22:57:12.396Z",
                "visitor": [
                    {
                        "click": 1,
                        "_id": "60f60d23f8f927340cf8e041",
                        "date": "2021-07-19T23:39:15.441Z"
                    }
                ],
                "__v": 3,
                "updated_at": "2021-07-20T01:26:05.000Z"
            }
                        
        } 
        }
        */
        res.status(200).json({message:"custom url created", data})
    })
}