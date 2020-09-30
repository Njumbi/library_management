$(document).ready(() => {
    fetchStudent()
    addStudent()
})
const fetchStudent = () => {
    var table = $('#students_table').DataTable({
        "pageLength": 30,
        "processing": true,
        "serverSide": false,
        'ajax': {
            'type': 'GET',
            'url': '/students/data'
        },
        "columns": [{
                'data': "name",
                "defaultContent": "",
                "title": "Name"
            },
            {
                'data': "student_book.name",
                "defaultContent": "",
                "title": "Books"
            },
            {
                'data': "createdAt",
                "defaultContent": "",
                "title": "Created At"
            },
        ]
    })
}
const addStudent = () => {
    $('#add_student_form').submit(e => {
        e.preventDefault()
        swal({
            title: "Add Student",
            text: "This student will be added to the system",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, () => {
            const name = $('#name').val();
            const bookId = $('#book_select').val()

            const studentData = {
                "name": name,
                "bookId": bookId
            }
            $.post('/students/add', studentData, (data, status) => {
                if (data.status === true) {
                    swal("success", data.message, "success")
                    $("#students_table").DataTable().ajax.reload(null, false);
                    $("#addStudentModal").modal('hide');
                    $('#add_student_form')[0].reset();

                } else {
                    swal("error", data.message, "error")

                }

            })




        })
    })

}