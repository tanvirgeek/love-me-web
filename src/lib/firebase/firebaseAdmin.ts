// lib/firebaseAdmin.ts
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "bdmarriage-5a590", // Replace with your Firebase Project ID
      clientEmail:
        "firebase-adminsdk-14hl5@bdmarriage-5a590.iam.gserviceaccount.com", // Replace with your Firebase client email
      privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCq4EFtifZzHeGc\nZ1swFjm2OzA8+u05p6grmY9lwsxxDD4XUBNAmbVDWKj8Bfr0slILNBoX/mrlVncq\nCMGlte622JFF7iqAVMvCMIzMpE8E7R0qoaGMZiXngC+7Arp7OGMm+jQacwh2Ykvg\nwd7QpcItjdF/V/iO9u4eAfGSkOY+pAEArF9RhmXcThlOOmqB8zr8/55vHNOa+xkZ\ntAPS5rgXZoW8gtuGitA3xo6ykmrANPuwXVjUmuhK1m1lcO2xtNaKR31XPa34eqT9\nG1HoRHNlthVuTBBvNxYjkOCRWsN8nGcJatre7stVb+haI+e0wD3b9tf2drQVJQUS\nfx8bDsqtAgMBAAECggEADQazdipCQ1xPyqCGbxACrkWs07k9RFvnkgtOxy8mbqfE\nQ/qyvQX6r3uexjeeffDqGDiMlK+sbnc89lNcj8livUWdLXuOeeH89nzE/wS3kWSS\nCKHxssZGtXMsMFFw7dvKkzoXpryGNKAhsKyW08kPGHHrOo32QM/KLzdutwGcy8GM\nznGyvUItguf932I/x2xRp1DG9i5DZQo7cDBM0Qebme4ZLv5S5RHKzsMZmYzyRIs4\nuWIbXUikNdC+Yz+gsRRiG4bc+XH8WQKPwKoashOsPMWUXf57jWyvH0Oegj6rht8e\nL5z+Nji+IcCDud116bdaeeYQ4lv2J4/UmP/OBggN8QKBgQDpIZrQjOdAM5Hmzz6P\nl5xcw18UCJ/I3aeaIaPUcK3OOz2ZOTbttEo7Y009vgxI2FpxtbyoDN8AJ6V8A+f6\nXENGR+VXOW5LfHSS1McUeDCwsK7yMQkMqhM1wq495kuSeSaGpDjOxEI6SjNwPxTd\nSxPHE2RE2aIPFPulxw9+z6SqRwKBgQC7o0u08d8orZPHiW5El1LrKBSjdZfPvuHr\n4sKoPolumQyvLDZPnsVngSkoIk4vxFGO3f4dpbWuaqy7EOF/fi0lrsJ0zorVucYV\nRYs0AAul/Ul81JWJNNVY5mGfSxNnqO+SKgDDLWEfKTr1a/VuejX8Jp+MvKjBg9oL\nAxApuzfpawKBgQCkWhaEU/FrZ2/CYfRe0qlfFDThMLtEpk7T8EdJKy68pzLj5Fv+\n9A0pFPaNQn/ykuQgKdkYOAq2Vzzo0vAlpgmfcGwUM963xMOCCBNZMOpShhyvjTYu\nAXCNg/PGm6ZHWrV4UiniSqXN5iWhSjdxUs5cmCUmDK+dJlPKKS2ZXtVdXQKBgQC3\nDGDIzsTDbEIkgJ+/7lgH7Hvl0swc8Lx5YChB9XAhItHK+jiph9xQUyKRcpYP51ch\nJtPGnGgXFR4ZCCjUNYVZo5k0VmH+ilMBYWyheAHlFqlgTArtZUtUhLtrqNPvZlEA\nqFVCEr0SpyhLT9yIwFR1/j/cDhgbYMOPxpc3/tpWrQKBgQDi6vcjaxYxHPy9Mpac\nHdbtD7YWFK4BJbOr+Mj27bP3CcCpvquw4AAd9ecC/lI2SQrgegm55uqarZUm6Yvh\nn7ohJir5EAaEuaicrbKiNcBMI3k8iD4AruMk8045uZlEcpWGjsOiUg9FlbTlckv1\nAQ0S5Yk+98zgWuBIg2psGXorqw==\n-----END PRIVATE KEY-----\n", // Replace with your private key
    }),
  });
}

export const auth = admin.auth();
