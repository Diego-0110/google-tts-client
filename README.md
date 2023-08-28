# GOOGLE TEXT-TO-SPEECH CLIENT

A Web Application to convert text to an audio file using Google's Text-to-Speech API.

## FEATURES

- UI based on Material Design.
- Client and Server validations.
- Data Revalidation.
- Fallback error component.

## HOW TO USE

### Dependencies Installation.

```bash
npm install
```

### API Credentials.

Follow the next steps in case you don't have a service account's key:

- Create an account in Google Cloud.
- Create a new project.
- Go to 'IAM and Admin > Service Account'.
- Create a new service account (You just need a name).
- Go to the new service account's page and create a new key (select .json).

After all that, you have a JSON file downloaded. Move it to the project's root and create a file '.env.local' with the next content:

```
GOOGLE_APPLICATION_CREDENTIALS="<filename>.json"
```

Change the name if you want (I use 'serviceaccount.json'), but remember that this file should be included in the '.gitignore' file.

### Run Development Server.

```bash
npm run dev
```

After that, the app will be accessible at http://localhost:3000

### Production Deployment.

```bash
npm run build
npm run start
```

After that, the app will be accesible in http://localhost:3000

## LICENSE

This project is licensed under the MIT License.
