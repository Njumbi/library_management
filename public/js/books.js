$(document).ready(() => {
    $("#b_img").change(function () {
        readURL(this);
    });

    fetchBook()
    addBook()
})

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#book_image').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}
const fetchBook = () => {
    var table = $('#books_table').DataTable({
        "pageLength": 30,
        "processing": true,
        "serverSide": false,
        'ajax': {
            'type': 'GET',
            'url': '/books/data'
        },
        "columns": [{
                'data': "image",
                "defaultContent": "",
                "title": "image",
                'render': function (data, type, full, meta) {
                    return "<img src= " + data + " style='height:80px;width:100px;'/>"
                }
            },
            {
                'data': "name",
                "defaultContent": "",
                "title": "Name",
            },
            {
                'data': "description",
                "defaultContent": "",
                "title": "Description",
            },
            {
                'data': "createdAt",
                "defaultContent": "",
                "title": "Created At"
            },
            {
                "targets": -1,
                "data": null,
                "defaultContent": "<button id='edit' class='btn btn-info'>edit!</button>"
            },
            {
                "targets": -1,
                "data": null,
                "defaultContent": "<button id='delete' class='btn btn-danger'>Delete!</button>"
            },

        ]
    })
}
const addBook = () => {
    $('#add_book').submit(e => {
        e.preventDefault()
        swal({
            title: "Add Book",
            text: "This book will be added to the system",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, () => {
            const bookImage = $('#b_img').get(0).files;
            const bookName = $('#b_name').val();
            const bookDescription = $('#desc').val();
            const shelfId = $('#shelf_select').val();
            const subCatId = $('#subc_select').val()
            const catId = $('#category_select').val()
            const rowId = $('#row_select').val()

            const formData = new FormData();
            formData.append("image", bookImage[0]);
            formData.append("name", bookName)
            formData.append("desc", bookDescription);
            formData.append("shelfId", shelfId);
            formData.append("subCatId", subCatId)
            formData.append("catId", catId)
        
            $.ajax({
                type: "POST",
                url: '/books/add',
                data: formData,
                processData: false,
                contentType: false,
                success: (data) => {
                    if (data.status === true) {
                        swal("Success", data.message, "success")
                        $("#books_table").DataTable().ajax.reload(null, false);
                        $('#addBookModal').modal('hide');
                        $('#add_book')[0].reset();
                    } else {
                        swal("Error", data.message, "error")
                    }

                }
            })

        })
    })

}