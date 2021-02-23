import config from '../config'


const getAllHisData = async (uEmail) => {
    console.log("called by", uEmail)
    const allhisData = await fetch(config.serverUrl+"/api/history/").then(res => res.json())
    //console.log(allhisData)
    var myHis = []
    allhisData.forEach(his => {
        // When the company's userEmail can't match the param userEmail which is sent from frontend, don't load it DONE
        if (his.userEmail === uEmail) {
            myHis.push(his)
        }        
    });
    return myHis
  }

const addHisData = async (data) => {
    await fetch(config.serverUrl+"/api/history/", {
        method: "POST",
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(data)
    }).then(alert("Successfully archived.")).then(window.location.reload())

}

const deleteHisData = async (aRow) => {
    var id = aRow._id
    console.log(id)
    await fetch(config.serverUrl+"/api/history/"+id, {
        method: "DELETE"
    }).then(alert("Latest row deleted.")).then(window.location.reload())
}

export { getAllHisData, addHisData, deleteHisData }