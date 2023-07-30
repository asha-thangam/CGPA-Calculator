// var total_gpa_points = 0;
var total_credits = 0;

let count; 
var total_sub_count = 0;

credit_arr = [];
gradePoint = [];

function createSem() {
  count = document.getElementById("n-sem").value;
  if(count>0){
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
      total_sub_count += subjectCount;
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
  // Calculate CGPA button
  let calcCgpaBtn = document.createElement("button");
  calcCgpaBtn.innerHTML = "Calculate CGPA";
  calcCgpaBtn.id = "btnCgpaCalc";
  calcCgpaBtn.addEventListener("click", calculateCGPA);

  // Cancel button
  let cancelBtn = document.createElement("button");
  cancelBtn.innerHTML = "Cancel";
  cancelBtn.id = "btnCancel";
  cancelBtn.onclick = () => {
    semArea.innerHTML = "";
  };

  // Append the "Calculate CGPA" and "Cancel" buttons to the semArea
  semArea.appendChild(calcCgpaBtn);
  semArea.appendChild(cancelBtn);
}
else{
  alert("Enter atleast one semester");
}
}

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
      emp.text = "Select Your grade";
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
      sub_code.setAttribute("id", "sub" + semesterNumber + "_" + i);
      sub_code.setAttribute("placeholder", "Subject Code");
      credit.setAttribute("id", "credit" + semesterNumber + "_" + i);
      credit.setAttribute("placeholder", "Credits");
      credit.setAttribute("min", "0");
      credit.setAttribute("max", "10");
      sel.setAttribute("id", "grade" + semesterNumber + "_" + i);
      sel.setAttribute("marging", "10px");
      Form.appendChild(sub_code);
      Form.appendChild(credit);
      Form.appendChild(sel);
      gpaArea.appendChild(Form);
    }

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
    gpaArea.appendChild(cancelBtn);
  } else {
    alert("Enter at least one subject!");
  }
}

function calculateCGPA() {
  total_gpa_points = 0;
  total_credits = 0;

  for (let i = 1; i <= count; i++) {
    for (let j = 1; j <= parseInt(document.getElementById("sem" + i).value); j++) {
      let creditElement = document.getElementById("credit" + i + "_" + j);
      let gradeElement = document.getElementById("grade" + i + "_" + j);

      if (creditElement && gradeElement) {
        let credit = parseInt(creditElement.value);
        let grade = gradeElement.value;

        if (!isNaN(credit) && credit >= 0 && credit <= 10) {
          total_credits += credit;
          total_gpa_points += calculateGPAPoint(grade) * credit;
        } else {
          alert("Please enter valid credits for all subjects.");
          return;
        }
      }
    }
  }
  let cgpa=document.getElementById("cgpa"); 
  if (total_credits > 0) {
    let cgpaVal = total_gpa_points / total_credits;
    console.log(cgpaVal);
    cgpa.innerHTML="Your CGPA is "+(cgpaVal.toFixed(2));
  } else {
    alert("Total credits cannot be zero.");
  }
}

function calculateGPAPoint(grade) {
  // Add cases for other grades if needed
  switch (grade) {
    case "O":
      return 10;
    case "A+":
      return 9;
    case "A":
      return 8;
    case "B+":
      return 7;
    case "B":
      return 6;
    default:
      return 0;
  }
}
