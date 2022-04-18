const APP_NAME = process.env.APP_NAME

module.exports = { 
    MONGO_CONN_OPTIONS: { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false  },
    JWT_SECRET:'~Umjy)[_6P}Te=pfb<$^]F8;J9WS-wB?D2uhEsG3&n5rY,C%+XBMr%x_Lfb}!#P:g^sXdFaHu8,3V$EwJ5>c&N9{G6K+vk~hTRt)KU;8^[dkwajD_{uQy-tr97@NR/$<feHqTz&}=2Jv?CE,Z*V#5]$x)&2h4A}M6Hf8N7S]B35D@ZtU[nb/k=%p#TsuLCP(GeV,9a:+(a+,HJfy#F:8[&xM_9tT$qn}e;zSWA5h)E-p/6.gP?s=c<~LX*cdYbv@$y&-xRQX2#:6:t%L',
    REFRESH_TOKEN_SECRET:'a/aJRQJ\qV*K9K3!$AABJQAAAQEAqESm63ifFpWshsNsRoRaQllv93ftBh4eM8OZDDPykbgviZrDFeX/IPYKFqghd2G4NjibzVAdYKGQHVV2ySU7FrrfauaMDrdbsWup7s3/77es0OW2bBrDk4tATePGm0HJ2xnUWhos5TNhUKPVjkv62vWzZ8JKtLe2EahVRQ/aq0I28rIayAxCOizyXviu2LYXkRwgfaaiD7FUG9dKJwlwyU3SGkQ1ssTwyquHpptXdAVISMVkd9AJZVDCEIhWQ',
    REFRESH_TOKEN_LIFE:"30d",
    REFRESH_TOKEN_ALGO:"HS256",
    tokenExpireTime:"4h",
    welcome_email_subject: `Welcome to ${APP_NAME}`,
    emailUrl:'/api/auth/verify/',
    emailLocalUrl:`/api/auth/verify/`,
    EMAIL_TOKEN_EXPIRY:"12h",
    directories:{
        logs: 'logs',
        uploadsRoot: 'uploads',
        uploadsPublic: 'uploads/public',
        uploadsPrivate: 'uploads/private',
    }
 
}
