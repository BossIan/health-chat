$("form").submit(function(e) {
    e.preventDefault();
});
function validateForm() {
    var userdata = {
        email: $('#login').text()
    } 
    socket.emit('validateSurvey', userdata)
    socket.once('validated', function (dbdata) {
        if (dbdata) {
            alert('Already Submitted')
            return
        }
        else {
            socket.emit('submitForm', data)
            userdata = {
                email: $('#login').text(),
                submitted: true
            } 
             socket.emit('submittedForm', userdata)
        }
    })
    
    var data = 
    { 
        name: $('#lastname').val() + ' ' +$('#firstname').val() +' '+ $('#middlename').val() +' '+ $('#maidenname').val(),
        dateOfBirth : $('#dateofbirth').val(),
        placeOfBirth : $('#placeofbirth').val(),
        sex: $("input[name=gender]:checked").val(),
        civilStatus : $("input[name=civil]:checked").val(),
        citizenShip : $('#citizenship').val(),
        mobileNumber : $('#mobileNumber').val(),
        email : $('#email').val(),
        presentAddress : $('#presentaddress').val(),
        presentZipcode : $('#presentzipcode').val(),
        permanentAddress : $('#permanentaddress').val(),
        permanentZipcode : $('#permanentzipcode').val(),
        nameOfSchoolLastAttended: $('#schoolAttended').val(),
        schoolAddress : $('#schoolAddress').val(),
        schoolSector : $('#schoolSector').val(),
        highestAttainedGradeYearLevel : $('#gradelevel').val(),
        typeOfDisability : $('#disability').val(),
        ipAffiliation : $('#ipAffiliation').val(),
        statusFather : $("input[name=fatherstatus]:checked").val(),
        statusMother : $("input[name=motherstatus]:checked").val(),
        nameFather : $('#fatherName').val(),
        nameMother : $('#motherName').val(),
        nameGuardian : $('#guardianName').val(),
        addressFather : $('#fatherAddress').val(),
        addressMother : $('#motherAddress').val(),
        addressGuardian : $('#guardianAddress').val(),
        contactNumberFather : $('#fatherContact').val(),
        contactNumberMother : $('#motherContact').val(),
        contactNumberGuardian : $('#guardianContact').val(),
        occupationFather : $('#fatherOccupation').val(),
        occupationMother : $('#motherOccupation').val(),
        occupationGuardian : $('#guardianOccupation').val(),
        nameOfEmployerFather : $('#fatherEmployerName').val(),
        nameOfEmployerMother : $('#motherEmployerName').val(),
        nameOfEmployerGuardian : $('#guardianEmployerName').val(),
        employerAddressFather : $('#fatherEmployerAddress').val(),
        employerAddressMother : $('#motherEmployerAddress').val(),
        employerAddressGuardian : $('#guardianEmployerAddress').val(),
        highestEducationalAttainmentFather : $('#fatherEducation').val(),
        highestEducationalAttainmentMother : $('#motherEmployerAddress').val(),
        highestEducationalAttainmentGuardian : $('#guardianEducation').val(),
        totalParentsTaxableIncomeFather : $('#fatherIncome').val(),
        totalParentsTaxableIncomeMother : $('#motherIncome').val(),
        totalParentsTaxableIncomeGuardian : $('#guardianIncome').val(),
        dsdw : $("input[name=dswd]:checked").val(),
        schoolEnroll : $('#schoolEnroll').val(),
        schoolAddress0 : $('#schoolAddress').val(),
        typeOfSchool : $("input[name=typeOfSchool]:checked").val(),
        degreeProgram : $('#degree').val(),
        enjoying :$("input[name=enjoyingOther]:checked").val(),
        signature : $('#signature').val(),
        dateAccomplished : $('#dateAccomplished').val(),
        approved : ''
      }
      
}