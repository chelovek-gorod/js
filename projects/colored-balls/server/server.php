<?php
header('Content-Type: application/json');

// $ip = $_SERVER['REMOTE_ADDR'];

/*
{
    "best1": {
        "name":"",
        "scores":0
    },
    "best2": {
        "name":"",
        "scores":0
    },
    "best3": {
        "name":"",
        "scores":0
    }
}
*/

$data = json_decode(file_get_contents('php://input'), true);
$results = json_decode(file_get_contents("scores.json"), true);

function findName() {
    global $data, $results;
    if ($data["name"] == $results["best1"]["name"]) return 1;
    if ($data["name"] == $results["best2"]["name"]) return 2;
    if ($data["name"] == $results["best3"]["name"]) return 3;
    return 0;
}

switch (findName()) {
    case 0 :
        if ($data["scores"] > $results["best1"]["scores"]) {
            replace2to3();
            replace1to2();
            updateBest(1);
        } else if ($data["scores"] > $results["best2"]["scores"]) {
            replace2to3();
            updateBest(2);
        } else if ($data["scores"] > $results["best3"]["scores"]) {
            updateBest(3);
        }
        break;
        
    case 1 :
        if ($data["scores"] > $results["best1"]["scores"]) updateBest(1);
        break;
        
    case 2 :
        if ($data["scores"] > $results["best1"]["scores"]) {
            replace1to2();
            updateBest(1);
        } else if ($data["scores"] > $results["best2"]["scores"]) updateBest(2);
        break;
        
    case 3 :
        if ($data["scores"] > $results["best1"]["scores"]) {
            replace2to3();
            replace1to2();
            updateBest(1);
        } else if ($data["scores"] > $results["best2"]["scores"]) {
            replace2to3();
            updateBest(2);
        } else if ($data["scores"] > $results["best3"]["scores"]) updateBest(3);
        break;
}

function replace2to3() {
    global $results;
    $results["best3"]["name"] = $results["best2"]["name"];
    $results["best3"]["scores"] = $results["best2"]["scores"];
}

function replace1to2() {
    global $results;
    $results["best2"]["name"] = $results["best1"]["name"];
    $results["best2"]["scores"] = $results["best1"]["scores"];
}

function updateBest($number) {
    global $data, $results;
    $bestNumber = "best".$number;
    
    $results[$bestNumber]["name"] = $data["name"];
    $results[$bestNumber]["scores"] = $data["scores"];
    
    $res_str = json_encode($results, true);
    $f_w_scores = fopen("scores.json", "w");
    fwrite($f_w_scores, $res_str);
    fclose($f_w_scores);
}

echo json_encode($results, true);

?>