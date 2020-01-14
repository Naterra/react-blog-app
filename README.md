# React Blog App

- React SSR   (Next.js)
- Authentication (Passport.js) 
- Mailing with templates (Nodemailer & Email-Templates )
- Sitemap.xml






#### Local / Development
Fill parameters in .env and /config, then
 
```
npm install  
npm run dev
```
 


#### Deployment / Production

```
1. Upload files on server
2. "npm install" - install modules
3. "npm run build:pm2" - production build & restarting pm2
```

 

#### Admin Page

1. Create User account at YOUR_SITE_NAME.com/auth ,
2. Open mLab and extend user record to have property "admin": true.
 
Now, you could access Admin Page 

 
 
### Email Server
We using Gmail Server for sending emails.  
Make sure, you turn ON  "Less Secure App" option here
https://myaccount.google.com/lesssecureapps

```
// Update .env file with your credentials
SITE_HOST=http://YOUR_SITE_NAME.com
EMAIL_SERVER=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USERNAME=MAIL_SERVER_EMAIL@gmail.com
EMAIL_PASSWORD=MAIL_SERVER_PASSWORD
ADMIN_EMAIL=YOUR_EMAIL@gmail.com
```


 