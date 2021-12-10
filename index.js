
const mysql = require('mysql');
const port = "5555";

const conn = mysql.createConnection({
    host: "localhost",
    port: "3306",
    database: "szoftver",
    user: "szoftver",
    password: "szoftver"
});


/*3.	Törölje azokat a szoftvereket amelyek kategória neve tartalmazza a „demo” szót valamilyen formában!*/

const torolSQL = "DELETE FROM szoftver WHERE kategoria LIKE '%demo';";
conn.query(torolSQL,(err,result)=>{
    if(err) throw err;
    console.log(`A törölt sorok száma: ${result.affectedRows}`);
});

/*5.	Azoknál amelyeknél a verziószámot nem ismerjük, állítsa be az 1.0.0 értéket!*/
const modositSQL = "UPDATE gep SET tipus='1.0.0' WHERE tipus IS NULL;";
conn.query(modositSQL,(err,result)=>{
    if(err) throw err;
    console.log(`A változtatott sorok száma: ${result.affectedRows}`);
});


/*4.	Vegye fel a következő id-nek a 202 szobába azt a notebookot, amelynek az IP címe 172.16.0.102. (Az adatbázisban előbb állítsa be, hogy az összes ID automatikusan inkrementálódjon)*/

const beszurSQL = "INSERT INTO gep (hely,tipus,ipcim) VALUES (202,'notebook','172.16.0.102');";
conn.query(beszurSQL,(err,result)=>{
    if(err) throw err;
    console.log(`A plusz sorok száma: ${result.affectedRows}`);
});

/*1.	Készítsen lekérdezést, amely megadja, hogy mely gépekre került fel egy program több verziója is 2016-ban! (Például a 192.168.2.15 IP-című gépre a Google Drive két verziója is felkerült.) A gép helyét, IP-címét és a szoftver nevét adja meg! */

const feladat1 = "SELECT gep.id FROM gep INNER JOIN telepites ON gep.id=gepid INNER JOIN szoftver ON szoftver.id=szoftverid WHERE YEAR(datum)=2016 GROUP BY gep.id, nev HAVING COUNT(hely)>1;";
conn.query(feladat1,(err,result,field)=>{
    if(err) throw err;
    const sorok = JSON.parse(JSON.stringify(result));
    console.log(`Az 1-es feladat eredménye: ${sorok.length}`);
    for(sor of sorok)
        console.log(`Eredmény: ${sor.id} gépre került fel ugyanaz több verzióban 2016-ban.`);
});
/*2.	Készítsen lekérdezést, amely megadja azon gépek IP-címét, ahol Mozilla Firefox és Google Chrome böngésző is van!*/

const feladat2="SELECT ipcim FROM gep INNER JOIN telepites ON gep.id=gepid INNER JOIN szoftver on szoftver.id=szoftverid WHERE nev='Mozilla Firefox' AND ipcim IN (SELECT ipcim FROM gep INNER JOIN telepites ON gep.id=gepid INNER JOIN szoftver on szoftver.id=szoftverid WHERE nev='Google Chrome');";

//const feladatketto
conn.query(feladat2,(err,result,field)=>{
    if(err) throw err;
    const sorok = JSON.parse(JSON.stringify(result));
    console.log(`Az 2-es feladat eredménye: ${sorok.length} sort tartalmaz:`);
    for(sor of sorok)
        console.log(`IP cím: ${sor.ipcim}`);
});
conn.end();