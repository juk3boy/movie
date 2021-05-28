function searchMovie() {
    // ini agar pertama diklik trus akan langsung dikosongkan dan kemudian request kemabli
    $('#movie-list').html('');


    // bisa juga mengguankan dibawah ini namun akan menjadi panjang
    // $.getJSON('http://www.omdbapi.com?apikey')

    // agar tidak terlalu panjang penulisan key api nya maka kita pakai ajax spt dibawah

    $.ajax({
        //paramenter utama
        url: 'http://www.omdbapi.com',
        type: 'get',
        datatype: 'json',  // ini type nya banyak spt. JSON, JSXML, dsb
        // kita akan mengirimkan data apa ke url utama (param utama)
        data: {
            'apikey': '307f3657',
            's': $('#search-input').val(), // jquery ambilkan saya id search-input ambil value nya apasaja
        },

        // kalau success (berarti ajax nya dikirim)
        success: function (result) {
            //Response ==  "True"  dilihat dari conlose.log(result)
            if (result.Response == "True") {

                let movies = result.Search;

                //kemudian kita looping
                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <div class="col-md-4"
                            <div class="card mb-3">
                              <div class="row">
                              <div class="col-md-4">
                                <img class="card-img-top" src="`+ data.Poster + `">
                              </div>
                                </div>
                                    <div class="card-body">
                                        <h5 class="card-title">`+ data.Title + `</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">`+ data.Year + `</h6>
                                        
                                         <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID + `">See Detail</a>
                                    </div>
                            </div>
                        </div>
                    `);
                });

                $('#search-input').val('');  // ini untuk mengosongkan kembali tombol search

            } else {
                //result.Error utk memunculkan error dari API nya (bisa dilihat dr console.log(result))
                $('#movie-list').html('<h3 class="text-center">' + result.Error + '</h3>')
            }
        }
    });
}


// ini hanya event nya di clikl (on(clicks))
$('#search-button').on('click', function () {

    searchMovie();

});


$('#search-input').on('keyup', function (e) {

    // dibawah ini bisa menggunakan keycode / which
    if (e.which === 13) {
        searchMovie();
    }

});

/** karena posisi see-detail berada di modal yg tdk tampak namun berada di #movie-list maka ada efek boubling */
/** tdk bisa menggunakan dibawah ini */

// $('.see-detail').on('click', function () {
//     //untuk mengecek $(this) = ambil tombolnya
//     console.log($(this).data('id'));
// });


/** solusinya spt dibawah */

$('#movie-list').on('click', '.see-detail', function () {
    // untuk mengecek $(this) = ambil tombolnya
    // console.log($(this).data('id'));

    //maka kita panggil ulang ajax

    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        datatype: 'json',
        data: {
            'apikey': '307f3657',
            'i': $(this).data('id'),  //$(this) adalah tombol see-detail yg diklik
        },

        success: function (movie) {
            if (movie.Response === "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                            <img src="`+ movie.Poster + `" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3> `+ movie.Title + `</h3></li>
                                    <li class="list-group-item"> Released : `+ movie.Released + `</li>
                                    <li class="list-group-item"> Genre : `+ movie.Genre + `</li>
                                    <li class="list-group-item"> Actors : `+ movie.Actors + `</li>
                                    </ul>
                                    <li class="list-group-item"> Writer : `+ movie.Writer + `</li>
                                    </ul>
                                    <li class="list-group-item"> Plot : `+ movie.Plot + `</li>
                                    </ul>
                            </div>

                        </div>
                    </div>
                `);
            }
        }
    });

});
