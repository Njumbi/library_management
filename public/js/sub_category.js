$(document).ready(() => {
    fetchsubCategory()
    addSubCategory()
})
const fetchsubCategory = () => {
    var table = $('#subcategories_table').DataTable({
        "pageLength": 30,
        "processing": true,
        "serverSide": false,
        'ajax': {
            'type': 'GET',
            'url': '/subcategory/data'
        },
        "columns": [{
                'data': "name",
                "defaultContent": "",
                "title": "Name"
            },
            {
                'data': "category.name",
                "defaultContent": "",
                "title": "Category"
            },
            {
                'data': "createdAt",
                "defaultContent": "",
                "title": "Created At"
            },
        ]
    })
}
const addSubCategory = () => {
    $('#add_subcategory_form').submit(e => {
        e.preventDefault()
        swal({
            title: "Add Sub-Category",
            text: "This sub-category will be added to the system",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, () => {
            const subCategoryName = $('#subcategory_name').val()
            const catId = $('#cat_select').val()

            const subCategoryData = {
                "subCategoryName": subCategoryName,
                "catId": catId,
            }
            $.post('/subcategory/add', subCategoryData, (data, status) => {
                console.log(data)
                if (data.status == true) {
                    swal("success", data.message, "success")
                    $("#subcategories_table").DataTable().ajax.reload(null, false);
                    $("#addSubCategoryModal").modal('hide');
                    $('#add_subcategory_form')[0].reset();
                } else {
                    swal("Error", data.message, "error")
                }

            })
        })
    })

}