const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
  
    "type": "service_account",
    "project_id": "crud-app-d735f",
    "private_key_id": "8d00b15aa343acd4e8d9338fdb824581b4b9c2dd",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDlDieKWBL8QvYk\nSIVqi0AIsVHTwth0KJgEEKMpZZxg137j7hOZrIyAtpddY4CVUZWk8XbrrPP8AEZU\n7nmANSiBJZVM+d1owHCjGqU4x1ozrgMGKM/iqONv3bIEiLuhRCpn3+GAe/QE9DQj\nKZxnq7/Jmc1F3N4LNTkxDMBKj/0fiIBgw/zMZxaKY/Otm6fmcjvHRICc0Cxb93kF\npuMZgW21R1giTzWgmYXsXKUIZ5fmOstgZyqdtCAsau7TfPc037/CTcbZamXB5qwK\nEkW00HlxMFRJtzqteAPswpgA6hpott8VY39/ZYL9fNCzaZV7CVlGG0M7Hx1/tGGc\niYBodtCjAgMBAAECggEAErKGwcE8vit3zNsVS5mAVEqn2PcFFOj3YmWP8WIiU2QO\nhJaQ3QYma0n8WHA138/KvQMaPP9fjzOKijDz6WZCydVX4Z0H2Ml/UvZq2ZP++0xP\nYjep+IuRZ+FF6x7U324hXrH6G13YO8tKB5DEUVDGFV52UNHzAiE0a5o/MWxIMkRF\nBcFHMxv2X8CCV0gXnbYQuJuittm4LlLq7fMxKvt+FBAea0yFjSvmTelAwBD8+VJF\nCJvWwAAonCOO0sO9cZQDxbg/7op3gFLp2tMT6vSHbnMppdDud3wEYKoZDo+7mjmQ\n2MI0WkgE4cFPfLNH1qqTSNpmmcMWje7tyUW4lMN/eQKBgQDzMS7033awfbQVP3es\nvO4yiMxiQ/rsSB2U1YWzvd93pe5b8lmMjZegk3CK4LxikO7Ve42OD4fVzlw44kbd\nOfcYTUhfah/W54fBZ3FgULN/Z9dHg5XqqeKCb1WgBmWIAtVaPtC0aguwyOilyguA\nnQPCdGnzlm+uyDSohZxzAsHRbQKBgQDxHl9XcH8TEcPZ6P3UsokSamXGdv3ohQUT\nL7mbyRb51GokNGmuKVFDEcT5aG1Q4chk97XdIh/RwzIXmH746gKzl7rRM2xngvRe\nycKIjcWsa1LCro76p8s8Y4vMtBZv8g00pvTvde7ooKeRjoVX6Zk4KRJ2u1W5WegG\naT3WAfXwTwKBgGmNdmEIQL63wJrcUjgiRIygfX1FHjrBzj0UNBTgm4aV+Y/k72Mm\n7aHffKB6jKmHWHJGTxlSulVdXP+/jpxklU/x8zCeojUnhu+10yrHvDDXREQg48fX\ndp3Abvym6hiPikTCMNmtkWdovDmBKV7oR4J1/qqgJ9dHxDtEyrPMhY09AoGAGAzo\ng6dD9Zn7CBxWXUXlqEGWn0I1N2E1TWGgSOq48PiAEdZsiCO06FS4agxBgyTSQUf4\nCvOhauHmeDYMzDVDSbijuMRBVt3YFDBZyBckFXurCKIyvsvH2OExC50W89mX+Z2B\npvUDfI6xyDIIGOnDD7gBEHjFJzTRkPokYdlWN78CgYBtnd/Ia23ChR8gcaCBOd01\nh3ouJS8lsEkIIyLd1BRiWMxBuicQ6QteL9EPvU/SpuXWb503S44wzcyFOzZGIbZ5\nLvqjwRPUggtFOdAIt/NXZkS0sB8F7B3a33oIZR82ZCMDTN6p9XDzN5lJFqJHYTWh\nHKHrn2/rnylBDtBo6BiJ8Q==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-j0yyo@crud-app-d735f.iam.gserviceaccount.com",
    "client_id": "101486168642569951458",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-j0yyo%40crud-app-d735f.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
});

// Retrieve all users
admin.auth().listUsers()
  .then((userRecords) => {
    const userRecordsWithIndex = [];

    userRecords.forEach((userRecord, index) => {
      const userWithIndex = {
        index: index + 1,
        email: userRecord.email,
        uid: userRecord.uid // You can store the UID if needed
      };
      userRecordsWithIndex.push(userWithIndex);
    });
    
    // Now userRecordsWithIndex contains user records with their respective index
    console.log(userRecordsWithIndex);
    
  })
  .catch((error) => {
    console.error('Error listing users:', error);
  });
