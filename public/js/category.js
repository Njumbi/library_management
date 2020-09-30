$(document).ready(() => {
    fetchCategory()
    addCategory()
})
const fetchCategory = () => {
    var table = $('#categories_table').DataTable({
        "pageLength": 30,
        "processing": true,
        "serverSide": false,
        'ajax': {
            'type': 'GET',
            'url': '/categories/data'
        },
        "columns": [{
                'data': "name",
                "defaultContent": "",
                "title": "Name"
            },
            {
                'data': "createdAt",
                "defaultContent": "",
                "title": "Created At"
            },
            {
                "targets": -1,
                "data": null,
                "defaultContent": "<button id='delete' class='btn btn-danger'>Delete!</button>"
            }
        ]
    })
}
const addCategory = () => {
    $('#add_category_form').submit(e => {
        e.preventDefault()
        swal({
            title: "Add Category",
            text: "This category will be added to the system",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, () => {
            const categoryName = $('#category_name').val()

            const categoryData = {
                "categoryName": categoryName
            }
            $.post('/category/add', categoryData, (data, status) => {
                console.log(data)
                if (data.status == true) {
                    swal("success", data.message, "success")
                    $("#categories_table").DataTable().ajax.reload(null, false);
                    $("#addCategoryModal").modal('hide');
                    $('#add_category_form')[0].reset();
                } else {
                    swal("Error", data.message, "error")
                }

            })
        })
    })

}