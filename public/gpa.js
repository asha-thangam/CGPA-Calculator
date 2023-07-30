var cc=1;
const credit_point=[];
const student_grade=[];
var total_points_earned=0;
var total_credits=0;
function addCourse()
{
    let count=document.getElementById("sub").value;
    let f=document.getElementById("gform");
    while(f.firstChild){
        f.removeChild(f.firstChild);
    }
    if(count>0){
        for(let i=1;i<=count;i++){
            //creating elements
            let sub_code=document.createElement("input");
            let credit=document.createElement("input");
            let f=document.getElementById("gform");
            let Form =document.createElement("form");
            var sel=document.createElement("select");
            var emp=document.createElement("option");
            var op1=document.createElement("option");
            var op2=document.createElement("option");
            var op3=document.createElement("option");
            var op4=document.createElement("option");
            var op5=document.createElement("option");
            var op6=document.createElement("option");
            emp.text="Select Your grade";
            op1.text="O";
            op2.text="A+";
            op3.text="A";
            op4.text="B+";
            op5.text="B";
            sel.add(emp,null);
            sel.add(op1,null);
            sel.add(op2,null);
            sel.add(op3,null);
            sel.add(op4,null);
            sel.add(op5,null);
            //setting id for created elements
            sub_code.setAttribute("id","sub"+cc);
            sub_code.setAttribute("placeholder","Subject Code");
            credit.setAttribute("id","credit"+cc);
            // credit.setAttribute("type","number");
            credit.setAttribute("placeholder","Credits");
            credit.setAttribute("min","0");
            credit.setAttribute("max","10");
            sel.setAttribute("id","grade"+cc);
            sel.setAttribute("marging","10px");
            Form.appendChild(sub_code);
            Form.appendChild(credit);
            Form.appendChild(sel);
            f.appendChild(Form);
            cc+=1;
        }
        //calculate button
        let calcBtn = document.createElement("button");
        calcBtn.innerHTML = "Calculate GPA";
        calcBtn.onclick = calculate;
        calcBtn.id = "calc";
        //cancel button
        let cancelBtn = document.createElement("button");
        cancelBtn.innerHTML = "Cancel";
        cancelBtn.id = "cancel";
        cancelBtn.onclick= () =>{
            while(f.firstChild){
                f.removeChild(f.firstChild);
            }
            cc=1;
        }
      
        // Append the "Calculate GPA" button to the HTML document
        document.getElementById("gform").appendChild(calcBtn);
        document.getElementById("gform").appendChild(cancelBtn);
    }
    else{
        alert("Enter Atleast one subject!");
    }
    document.getElementById("sub").value = "";
}
function calculate()
{
    let c=0,g=0;
    let gpa=document.getElementById("gpa");    
    for(let i=1;i<cc;i++){
        let point=0;
        let g=document.getElementById("grade"+i).value;
        if(g=='O')point=10;
        else if(g=='A+')point=9;
        else if(g=='A')point=8;
        else if(g=='B+')point=7;
        else if(g=='B')point=6;
        c=document.getElementById("credit"+i).value;
        total_credits+=parseFloat(c);    
        total_points_earned+=(point*c);
        console.log(c+" "+point);
    }
    if(isNaN(total_credits)||isNaN(total_credits)){
        alert("Please Enter Details");
    }
    else{
        console.log(total_points_earned/total_credits);
        gpa.innerHTML="Your GPA is "+(total_points_earned/total_credits).toFixed(2);
        //again reset the values
        total_points_earned=0;
        total_credits=0;
    }
}

