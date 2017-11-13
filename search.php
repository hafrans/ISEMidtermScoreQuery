<?php
/**
	* @author Hafrans St.
	* @contact hafrans@163.com
	*/
    session_start();
	if(!isset($_SESSION['count'])){
		$_SESSION['count']=0;
		$_SESSION['expire'] = time();
	}
	@header("X-Powered-By: PHICOMM-K2");
	
	
    $dbstring = "mysql:host=127.0.0.1;dbname=test";
    $username = "root";
    $passwd = "root";
    $column_name = "score";
	
    $msg = array();
    $personal = array();
    /**
     * 判断AJAX数据传输
     */
       if(!isset($_SERVER["HTTP_X_REQUESTED_WITH"]) || strtolower($_SERVER["HTTP_X_REQUESTED_WITH"])<>"xmlhttprequest"){
           @header("Location:/index.html");
       }

//Redis Server Connection Kit
//     try{
//         $redis = @new Redis();
//         $redis->connect("127.0.0.1",6379);
//     }catch (Exception $e){
//     }
	@header("Content-Type: application/json;charset=utf-8"); //HTTP头用于jq返回
	if($_SESSION['expire'] - time() > 0){
		$msg["status"] = -1;
        $msg["msg"] = "让我喘口气<br>(:з」∠)";
        exit(json_encode($msg));
	}
    try{
        $data = new PDO($dbstring,$username,$passwd);
        $data->query("SET NAMES UTF8");
    }catch(PDOException $e){
        $msg["status"] = -1;
        $msg["msg"] = "数据库君没有起床<br>(:з」∠)";
        exit(json_encode($msg));
    }
    $name = htmlspecialchars(addcslashes($_POST['name'],"\0..\37"));
    $major = htmlspecialchars(addcslashes($_POST['major'],"\0..\37"));;
    $stu_num = htmlspecialchars(addcslashes($_POST['stu_num'],"\0..\37"));;
	$_SESSION['expire'] = time()+10;
	$_SESSION['count']++;
    $pmf = $data->prepare("SELECT * FROM ".$column_name." WHERE name = ? AND stu_num = ? AND major = ?");
    $pmf->bindParam(1,$name,PDO::PARAM_STR);
    //$pmf->bindParam(2,$admission,PDO::PARAM_INT);
    $pmf->bindParam(2,$stu_num,PDO::PARAM_INT);
	$pmf->bindParam(3,$major,PDO::PARAM_INT);
    if($pmf->execute()){
        $arr = $pmf->fetchAll(PDO::FETCH_ASSOC);
        if(count($arr)<>1){
            $msg["status"] = -2;
            $msg["msg"] = "找不到该同学的信息~<br>_(:з」∠)_";
            exit(json_encode($msg));
        }else{
           	$body = $arr[0];
			$body['status'] = 1;
			$body['msg'] = "OK";
			$body['major_id'] = $body['major'];
			//挂科率
			switch($body['major']){
				case 1:
					$body['m'] = "50%";
					$body['e'] = "31%";
					$body['t'] = "45%";
					break;
				case 2:
					$body['m'] = "70%";
					$body['e'] = "50%";
					$body['t'] = "73%";
					break;
				case 3:
					$body['m'] = "48%";
					$body['e'] = "29%";
					$body['t'] = "45%";
					break;
			}
			$body['major'] = ($body['major'] < 3)?($body['major'] == 1?"计类":"计数"):"电子";
            exit(json_encode($body));
        }
    }else{
        $msg["status"] = -1;
        $msg["msg"] = "数据库君倒下了_<br>(:з」∠)";
        exit(json_encode($msg));
    }
?>