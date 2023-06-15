var cc = 1;
var total_points_earned = 0;
var total_credits = 0;

let gpaArr = [];
let count = document.getElementById("n-sem").value;
function createSem() {
 
  let semArea = document.getElementById("sem");
  for (let i = 0; i < count; i++) {
    let title = document.createElement("h5");
    title.innerHTML = "Semester " + (i + 1);

    let sem = document.createElement("input");
    sem.id = "sem" + (i + 1);
    sem.setAttribute("placeholder", "Enter Number of Subjects");

    let semBtn = document.createElement("button");
    semBtn.id = "semBtn" + (i + 1);
    semBtn.innerHTML = "Enter";

    let gpaArea = document.createElement("div");
    gpaArea.id = "gpaArea" + (i + 1);

    semBtn.addEventListener("click", function() {
      let subjectCount = parseInt(sem.value);
      if (!isNaN(subjectCount) && subjectCount > 0) {
        // Perform GPA calculation for the entered number of subjects
        createGPA(subjectCount, gpaArea, i + 1);
      } else {
        alert("Please enter a valid number of subjects.");
      }
    });

    let semBreak = document.createElement("br");

    semArea.appendChild(title);
    semArea.appendChild(sem);
    semArea.appendChild(semBtn);
    semArea.appendChild(semBreak);
    semArea.appendChild(gpaArea);
  }
  let cal_cgpa = document.createElement("button");
  cal_cgpa.innerHTML = "Calcualate CGPA";
  cal_cgpa.id = "btnCgpaCalc";

  let cgpa_cancel = document.createElement("button");
  cgpa_cancel.innerHTML = "Cancel";

  semArea.appendChild(cal_cgpa);
  semArea.appendChild(cgpa_cancel);
}
//cgpa calculation
function calculateCGPA(){
    if(gpaArr.length != count){
        alert("Please Enter details for all semesters");
    }
    else{
        console.log("calCGPA is called");
    }
}

//creating gpa areas for each semseter
function createGPA(count, gpaArea, semesterNumber) {
  while (gpaArea.firstChild) {
    gpaArea.removeChild(gpaArea.firstChild);
  }
  if (count > 0) {
    for (let i = 1; i <= count; i++) {
      // Creating elements
      let sub_code = document.createElement("input");
      let credit = document.createElement("input");
      let Form = document.createElement("form");
      let sel = document.createElement("select");
      let emp = document.createElement("option");
      let op1 = document.createElement("option");
      let op2 = document.createElement("option");
      let op3 = document.createElement("option");
      let op4 = document.createElement("option");
      let op5 = document.createElement("option");
      let op6 = document.createElement("option");
      emp.text = "Select Your Grade";
      op1.text = "O";
      op2.text = "A+";
      op3.text = "A";
      op4.text = "B+";
      op5.text = "B";
      sel.add(emp, null);
      sel.add(op1, null);
      sel.add(op2, null);
      sel.add(op3, null);
      sel.add(op4, null);
      sel.add(op5, null);

      // Setting id for created elements
      sub_code.setAttribute("id", "sub" + i);
      sub_code.setAttribute("placeholder", "Subject Code");
      credit.setAttribute("id", "credit" + i);
      credit.setAttribute("placeholder", "Credits");
      credit.setAttribute("min", "0");
      credit.setAttribute("max", "10");
      sel.setAttribute("id", "grade" + i);
      sel.setAttribute("margin", "10px");
      Form.appendChild(sub_code);
      Form.appendChild(credit);
      Form.appendChild(sel);
      gpaArea.appendChild(Form);
    }
    // Calculate button
    let calcBtn = document.createElement("button");
    calcBtn.innerHTML = "Calculate GPA";
    calcBtn.id = "calc";
    calcBtn.addEventListener("click", function() {
        calculate(gpaArea, semesterNumber);
      });
  
      // Cancel button
      let cancelBtn = document.createElement("button");
      cancelBtn.innerHTML = "Cancel";
      cancelBtn.id = "cancel";
      cancelBtn.onclick = () => {
        while (gpaArea.firstChild) {
          gpaArea.removeChild(gpaArea.firstChild);
        }
      };
  
      // Append the "Calculate GPA" and "Cancel" buttons to the GPA area
      gpaArea.appendChild(calcBtn);
      gpaArea.appendChild(cancelBtn);
    } else {
      alert("Enter at least one subject!");
    }
  }
  
  function calculate(gpaArea, semesterNumber) {
    let c = 0;
    let gradeInputs = gpaArea.getElementsByTagName("select");
    let creditInputs = gpaArea.getElementsByTagName("input");
  
    for (let i = 0; i < gradeInputs.length; i++) {
      let point = 0;
      let grade = gradeInputs[i].value;
      if (grade === "O") point = 10;
      else if (grade === "A+") point = 9;
      else if (grade === "A") point = 8;
      else if (grade === "B+") point = 7;
      else if (grade === "B") point = 6;
    console.log(grade);
      c = parseFloat(creditInputs[i].value);
      total_credits += isNaN(c) ? 0 : c;
      total_points_earned += point * (isNaN(c) ? 0 : c);
    }
  
    if (isNaN(total_credits) || isNaN(total_points_earned) || total_credits === 0) {
      alert("Please enter valid details for all subjects.");
    } else {
      let gpa = document.createElement("p");
      let fgpa = (total_points_earned / total_credits).toFixed(2);
      gpaArr[semesterNumber] = fgpa;
      gpa.innerHTML = "Your GPA for Semester " + semesterNumber + " is " + fgpa;
    
      // Reset the values for the next calculation
      total_points_earned = 0;
      total_credits = 0;
  
      // Display the GPA result
      gpaArea.appendChild(gpa);
    }
  }
  
