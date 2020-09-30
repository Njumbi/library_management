$(document).ready(() => {
    fetchShelf()
    addShelf()
})
const fetchShelf = () => {
    var table = $('#shelves_table').DataTable({
        "pageLength": 30,
        "processing": true,
        "serverSide": false,
        'ajax': {
            'type': 'GET',
            'url': '/shelf/data'
        },
        "columns": [{
                'data': "name",
                "defaultContent": "",
                "title": "Name"
            },
            {
                'data': "shelfRow",
                "defaultContent": "",
                "title": "Row"
            },
            {
                'data': "sub_category.name",
                "defaultContent": "",
                "title": "Subcategory"
            },

        ]
    })
}
const addShelf = () => {
    $('#add_shelf_form').submit(e => {
        e.preventDefault()
        swal({
            title: "Add Shelf",
            text: "This shelf will be added to the system",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, () => {
            const shelfName = $('#shelf_name').val();
            const shelfRow = $('#row').val();
            const subCatId = $('#subcat_select').val()

            const shelfData = {
                "shelfName": shelfName,
                "shelfRow": shelfRow,
                "subCatId": subCatId
            }

            $.post('/shelf/add', shelfData, (data, status) => {
                if (data.status == true) {
                    swal("success", data.message, "success")
                    $("#shelves_table").DataTable().ajax.reload(null, false);
                    $("#addShelfModal").modal('hide');
                    $('#add_shelf_form')[0].reset();
                } else {
                    swal("Error", data.message, "error")
                }
            })



        })
    })

}