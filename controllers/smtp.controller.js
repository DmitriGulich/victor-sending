const nodemailer = require('nodemailer');
const Smtp = require('../models/smtp.model');

const checkSMTP = async (data, settings) => {
    try {
        let nodemailer_setting = {
            pool: true,
            host: data.host,
            port: data.port,
            secure: data.secure,
            proxy: data.proxy,
            auth: {
                user: data.user,
                pass: data.pass
            },
            tls: {
                rejectUnauthorized: false
            }
        };
        
        let transporter = nodemailer.createTransport(nodemailer_setting);
        transporter.set('proxy_socks_module', require('socks'));
        await transporter.verify();
        return Promise.resolve(transporter);
    } catch(err) {
        return Promise.reject(`SMTP ERROR => ${err.message}`);
    }
}

exports.createSmtp = async function(req, res) {
    try {
        const userId = req.user.id;
        
        const smtp = await Smtp.create({
            _userId : userId,
            host: req.body.host,
            port: req.body.port,
            user: req.body.user,
            password: req.body.password
        });

        return res.status(201).json({
            status: 'success',
            smtp
        });

    } catch (error) {
        return res.status(400).json({
            status: 'failed',
            msg: error
        });
    }
}

exports.updateSmtp = async function(req, res) {
    try {
        const userId = req.user.id;         

        const _update = {
            host: req.body.host,
            port: req.body.port,
            secure: req.body.secure,
            user: req.body.user,
            password: req.body.password
        }

        const result = await Smtp.findOneAndUpdate({_userId: userId}, _update);

        if(result === null) {
            return res.status(404).json({
                status: 'failed',
                msg: 'cannot find smtp'
            });
        }

        return res.status(200).json({
            status: 'success'
        });
    } catch (error) {
        return res.status(400).json({
            status: 'failed'
        });
    }
}

exports.getSmtp = async function(req, res) {
    try {
        const userId = req.user.id;

        const smtp = await Smtp.findOne({_userId: userId}).select('-__v -password');

        if(smtp === null) {
            return res.status(404).json({
                status: 'failed',
                msg: 'cannot find smtp'
            });
        }

        return res.status(200).json({
            status: 'success',
            smtp
        });
    } catch (error) {
        return res.status(404).json({
            status: 'failed',
            msg: 'cannot find smtp'
        })
    }
}

exports.sendEmail = async function(req, res) {
    const _userId = req.user.id;
    try {
        const smtpSettings = await Smtp.findOne({_userId});
        
        if(smtpSettings === null) {
            return res.status(404).json({
                status: 'failed',
                msg: 'cannot find SMTP settings'
            });
        }

        // add proxy!
        smtpSettings.proxy = req.body.proxy || '';
    
        const transporter = await checkSMTP(smtpSettings);
        
        // ready mail configuration
        let mailConfig = {
            from: smtpSettings.user,
            html: req.body.html,
            subject: req.body.subject,
            to: req.body.to,
            headers: {
                'X-MS-Exchange-Organization-AuthAs': 'Internal',
                'X-MS-Exchange-Organization-AuthMechanism': '07',
                // 'X-MS-Exchange-Organization-AuthSource': settings.MSEXORG,
                'X-UMINACJP-NODEMAILERSENDERZ':'true',
            }, 
            // attachments: [
            //     {
            //         filename: doN,
            //         content: doA
            //     },
            // ]
            
        }; 
    
        await transporter.sendMail(mailConfig);
    } catch (error) {
        return res.status(400).json({
            status: 'failed',
            msg: 'cannot send email'
        })
    }
}