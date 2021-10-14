const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const Smtp = require('../models/smtp.model');

function readLetter(letter, email, settings) {
    sletter = letter.replace(/SILENTCODERSEMAIL/g, email);
    sletter = sletter.replace(/SILENTLOGO/g, settings.logo);
    sletter = sletter.replace(/EMAILURLSILENTC0DERS/g, Buffer.from(email).toString('base64'));
    sletter = sletter.replace(/SILENTCODERSLIMAHURUF/g, randomstring.generate({length: 4, charset: 'numeric'}));
    sletter = sletter.replace(/SILENTCODERSBANYAKHURUF/g, randomstring.generate({length: 10, charset: 'alphabetic'}));
    sletter = sletter.replace(/USER/g, email.replace(/@[^@]+$/, ''));
    sletter = sletter.replace(/DOMAIN/g, email.replace(/.*@/, ''));
    return sletter;
}

function readFrom(from, random, email) {
    from = from.replace(/USER/g, email.replace(/@[^@]+$/, ''));
    from = from.replace(/DOMAIN/g, email.replace(/.*@/, ''));
    from = from.replace(/SILENTCODERSEMAIL/g, email);
    from = from.replace(/SILENTCODERSLIMAHURUF/g, randomstring.generate({length: 5, charset: 'alphabetic'}));
    from = from.replace(/SILENTCODERSBANYAKHURUF/g, randomstring.generate({length: 50, charset: 'alphabetic'}));
    return from;
}

function readLetterAttachments(letter, email, settings) {
    sletter = letter.replace(/SILENTCODERSEMAIL/g, email);
    // sletter = sletter.replace(/SILENTLINK/g, settings.LINK);
    // sletter = sletter.replace(/SILENTTITLE/g, settings.TITLE);
    sletter = sletter.replace(/SILENTBACKGROUND/g, settings.background);
    // sletter = sletter.replace(/SILENTFAVI/g, settings.FAVI);
    // sletter = sletter.replace(/SILENTLOCKREDIR/g, settings.LOCKREDIR);
    // sletter = sletter.replace(/SILENTSUCCESSREDIR/g, settings.SUCCESSREDIR);
    sletter = sletter.replace(/EMAILURLSILENTC0DERS/g, Buffer.from(email).toString('base64'));
    sletter = sletter.replace(/SILENTCODERSLIMAHURUF/g, randomstring.generate({length: 5, charset: 'alphabetic'}));
    sletter = sletter.replace(/SILENTCODERSBANYAKHURUF/g, randomstring.generate({length: 50, charset: 'alphabetic'}));
    sletter = sletter.replace(/USER/g, email.replace(/@[^@]+$/, ''));
    sletter = sletter.replace(/DOMAIN/g, email.replace(/.*@/, ''));
    return sletter;
}

function readName(name, random, email) {
    name = name.replace(/SILENTCODERSEMAIL/g, email);
    name = name.replace(/EMAILURLSILENTC0DERS/g, Buffer.from(email).toString('base64'));
    name = name.replace(/SILENTCODERSLIMAHURUF/g, randomstring.generate({length: 5, charset: 'alphabetic'}));
    name = name.replace(/SILENTCODERSBANYAKHURUF/g, randomstring.generate({length: 50, charset: 'alphabetic'}));
    name = name.replace(/USER/g, email.replace(/@[^@]+$/, ''));
    name = name.replace(/DOMAIN/g, email.replace(/.*@/, ''));
    return name;
}

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
                pass: data.password
            }
        };
        
        let transporter = nodemailer.createTransport(nodemailer_setting);
        transporter.set('proxy_socks_module', require('socks'));
        await transporter.verify();
        console.log('smtp controller 31 | verified transpoter!');
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
            secure: req.body.secure,
            proxy: req.body.proxy,
            user: req.body.user,
            thread: req.body.thread,
            email: req.body.email,
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
            proxy: req.body.proxy,
            user: req.body.user,
            thread: req.body.thread,
            email: req.body.email,
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
        // ready mail configuration        
        
        // add proxy!
        smtpSettings.proxy = req.body.proxy || '';
        const transporter = await checkSMTP(smtpSettings);
        
        
        const list = req.body.list.split("\n");
        console.log(list);
        for (let i = 0; i < list.length; i++) {
            const to = list[i];
            
            
            const doL = readLetter(req.body.html, to, req.body);
            const doF = readFrom(req.body.from, i, to);
            const doN = readName(req.body.attachment, i, to);
            // const doA = readLetterAttachments(smtpSettings.attachment, to, req.body);
            
            console.log(doL + ' ' + doF + ' ' + to);
            let mailConfig = {
                from: doF,
                html: 
                `<html>
                    ${doL}
                </html>`,
                subject: req.body.subject,
                to: to
                // headers: {
                //     'X-MS-Exchange-Organization-AuthAs': 'Internal',
                //     'X-MS-Exchange-Organization-AuthMechanism': '07',
                //     // 'X-MS-Exchange-Organization-AuthSource': settings.MSEXORG,
                //     'X-UMINACJP-NODEMAILERSENDERZ':'true',
                // }, 
                // attachments: [
                //     {
                //         filename: doN,
                //         content: doA
                //     },
                // ]
                
            }; 

            await transporter.sendMail(mailConfig);
            // await new Promise(r => setTimeout(r, (4000)));
        }
        
        
        console.log('Sent email');
        return res.status(200).json({
            status: 'success',
            msg: 'sent email'
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: 'failed',
            msg: 'cannot send email'
        })
    }
}

// protected & admin privileged
exports.updateAttachment = async function(req, res){
    const userId = req.params.id;

    try {
        // check user
        const user = await User.findOne({_id: userId});
        if(user === null){
            return res.status(404).json({
                status: 'failed',
                msg: 'cannot find user'
            });
        }

        // check SMTP settings
        const SmtpSetting = await Smtp.findOne({_userId: userId});
        if(SmtpSetting === null) {
            return res.status(404).json({
                status: 'failed',
                msg: 'cannot find SMTP setting'
            });
        }

        // check Attachment HTML content
        const htm = req.body.attachment;
        if(htm === null || htm === '') {
            return res.status(400).json({
                status: 'failed',
                msg: 'bad attachment htm content'
            });
        }

        SmtpSetting.attachment = htm;
        await SmtpSetting.save();

        return res.status(200).json({
            status: 'success',
            msg: 'Attachment html saved successfully.'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            msg: 'Database connection error'
        });
    }
}