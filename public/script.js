function supprimer(id){
    let pointFinal = "eleves/" + id
    fetch(
        pointFinal, {method : "DELETE"}
    ).then(
        (reponse)=> reponse.json()
    ).then(
        (donnee)=> window.location.href = donnee.routeRacine
    ).catch((erreur)=> console.log(erreur))
};

