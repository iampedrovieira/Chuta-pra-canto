const urlParams = new URLSearchParams(window.location.search);
const club = urlParams.get('club');

$('.first-container').hide()
$('.club-game').hide()
$('.news').hide()


var clube_img = ''
var clube_id = ''
var clube_name = ''

//get Clube ID
const settings_search = {
    "async": true,
    "crossDomain": true,
    "url": "https://transfermarket.p.rapidapi.com/search?query=" + club,
    "method": "GET",
    "headers": {
        "x-rapidapi-key": credentials.x_api_rapid,
        "x-rapidapi-host": "transfermarket.p.rapidapi.com",
        "useQueryString": "true"
    }
};

try {
    $.ajax(settings_search).done(function(response) {
        clube_id = response.clubs[0].id
        clube_img = response.clubs[0].logoImage

        //Get club info by id
        const settings_info = {
            "async": true,
            "crossDomain": true,
            "url": "https://transfermarket.p.rapidapi.com/clubs/get-profile?id=" + clube_id,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": credentials.x_api_rapid,
                "x-rapidapi-host": "transfermarket.p.rapidapi.com",
                "useQueryString": "true"
            }
        };

        $.ajax(settings_info).done(function(response) {
            clube_name = response.mainFacts.fullName
            $(".nome-clube").append(response.mainFacts.fullName);
            const img_clube = document.createElement('img');
            img_clube.className = 'img-clube'
            img_clube.src = clube_img
            $(".nome-clube").append(img_clube)

            const img_pais = document.createElement('img');
            img_pais.className = 'img-pais'
            img_pais.src = response.mainFacts.countryImage
            $(".nome-clube").append(img_pais)

            $(".fundacao").append('Founding: ' + response.mainFacts.founding)
            $(".tamanho-plantel").append('Squad size: ' + response.mainFacts.squadSize)
            $(".site").href = response.mainFacts.homepage

            $(".estadio_nome").append(response.stadium.name);

            const img_stadium = document.createElement('img');
            img_stadium.src = response.stadium.image
            $(".estadio").append(img_stadium)

            const build = document.createElement('p')
            build.className = 'construido'
            build.append('Build in: ' + response.stadium.constructionYear)

            const seats = document.createElement('p')
            seats.className = 'capacidade'
            seats.append('Seats: ' + response.stadium.seats)

            $(".estadio").append(build)
            $(".estadio").append(seats)



        });


        //SQUAD
        const table = $(".table-plantel");
        const settings_squad = {
            "async": true,
            "crossDomain": true,
            "url": "https://transfermarket.p.rapidapi.com/clubs/get-squad?id=" + clube_id,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": credentials.x_api_rapid,
                "x-rapidapi-host": "transfermarket.p.rapidapi.com",
                "useQueryString": "true"
            }
        };

        $.ajax(settings_squad).done(function(response) {

            response.squad.map(jogador => {

                const tr = document.createElement('tr');
                const td_name = document.createElement('td');
                td_name.className = 'td_table-name';

                const td_image = document.createElement('img');
                td_image.src = jogador.image;
                td_name.append(td_image);
                td_name.append(jogador.name);

                const td_nacionalities = document.createElement('td')
                td_nacionalities.className = 'td_table-nacionalities';

                jogador.nationalities.map(nac => {
                    const td_image_nac = document.createElement('img');
                    td_image_nac.src = nac.image;
                    td_nacionalities.append(td_image_nac)

                })

                const td_foot = document.createElement('td');
                if (jogador.foot == 'rechts') {
                    td_foot.append('R');
                } else {
                    td_foot.append('L')
                }

                const td_height = document.createElement('td');
                td_height.append(jogador.height)

                const td_number = document.createElement('td');
                td_number.append(jogador.shirtNumber);

                const td_age = document.createElement('td');
                td_age.append(jogador.age)

                const td_value = document.createElement('td');
                td_value.append(jogador.marketValue.value / 1000000 + 'M' + jogador.marketValue.currency)

                tr.append(td_name);
                tr.append(td_nacionalities);
                tr.append(td_foot);
                tr.append(td_height);
                tr.append(td_number);
                tr.append(td_age);
                tr.append(td_value);



                table.append(tr);
            })
        });


        //Transferenias


        const settings_trans = {
            "async": true,
            "crossDomain": true,
            "url": "https://transfermarket.p.rapidapi.com/transfers/list-by-club?id=" + clube_id + "&seasonID=2020",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": credentials.x_api_rapid,
                "x-rapidapi-host": "transfermarket.p.rapidapi.com",
                "useQueryString": "true"
            }
        };

        $.ajax(settings_trans).done(function(response) {

            const transferencias_arrivals = response.currentSeason.transferArrivals
            const transferencias_departures = response.currentSeason.transferDepartures
            const table_transferencia = $(".table-transferencias");

            for (var i = 0; i <= transferencias_arrivals.length && i <= transferencias_departures.length; i++) {

                const tr_1 = document.createElement('tr');
                const td_name_1 = document.createElement('td');
                td_name_1.className = 'td_table-name';
                tr_1.append(td_name_1);

                const td_image_1 = document.createElement('img');
                td_image_1.src = transferencias_arrivals[i].playerImage
                td_name_1.append(td_image_1);
                td_name_1.append(transferencias_arrivals[i].playerName);


                const td_date_1 = document.createElement('td');
                td_date_1.append(transferencias_arrivals[i].date)
                tr_1.append(td_date_1)


                const td_age_1 = document.createElement('td');
                td_age_1.append(transferencias_arrivals[i].age)
                tr_1.append(td_age_1)

                const td_left_1 = document.createElement('td');
                const td_left_1_image = document.createElement('img');
                td_left_1.className = 'td_table-clube';
                td_left_1_image.src = transferencias_arrivals[i].clubImage
                td_left_1.append(td_left_1_image)

                tr_1.append(td_left_1)

                const td_join_1 = document.createElement('td');
                const td_join_1_img = document.createElement('img');
                td_join_1.className = 'td_table-clube';
                td_join_1_img.src = clube_img
                td_join_1.append(td_join_1_img)

                tr_1.append(td_join_1)

                const td_value_1 = document.createElement('td');
                td_value_1.append(transferencias_arrivals[i].transferFee +
                    ' ' + transferencias_arrivals[i].transferFeeCurrency +
                    ' ' + transferencias_arrivals[i].transferFeeNumeral)
                tr_1.append(td_value_1)

                /*
                       Saidas
                 */
                const tr_2 = document.createElement('tr');
                const td_name_2 = document.createElement('td');
                td_name_2.className = 'td_table-name';
                tr_2.append(td_name_2);

                const td_image_2 = document.createElement('img');
                td_image_2.src = transferencias_departures[i].playerImage
                td_name_2.append(td_image_2);
                td_name_2.append(transferencias_departures[i].playerName);


                const td_date_2 = document.createElement('td');
                td_date_2.append(transferencias_departures[i].date)
                tr_2.append(td_date_2)


                const td_age_2 = document.createElement('td');
                td_age_2.append(transferencias_departures[i].age)
                tr_2.append(td_age_2)

                const td_left_2 = document.createElement('td');
                td_left_2.className = 'td_table-clube';
                const td_left_2_image = document.createElement('img');
                td_left_2_image.src = clube_img
                td_left_2.append(td_left_2_image)

                tr_2.append(td_left_2)

                const td_join_2 = document.createElement('td');
                td_join_2.className = 'td_table-clube';
                const td_join_2_img = document.createElement('img');
                td_join_2_img.src = transferencias_departures[i].clubImage
                td_join_2.append(td_join_2_img)


                tr_2.append(td_join_2)

                const td_value_2 = document.createElement('td');
                td_value_2.append(transferencias_departures[i].transferFee +
                    ' ' + transferencias_departures[i].transferFeeCurrency +
                    ' ' + transferencias_departures[i].transferFeeNumeral)

                tr_2.append(td_value_2)



                table_transferencia.append(tr_1)
                table_transferencia.append(tr_2)

            }
        });

        //JOGOS
        const settings_jogos = {
            "async": true,
            "crossDomain": true,
            "url": "https://transfermarket.p.rapidapi.com/matches/list-by-club?id=" + clube_id,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": credentials.x_api_rapid,
                "x-rapidapi-host": "transfermarket.p.rapidapi.com",
                "useQueryString": "true"
            }
        };

        $.ajax(settings_jogos).done(function(response) {
            const table_jogos = $(".table-jogos");
            const jogos = response.playClubMatches

            jogos.map(jogo => {
                const tr = document.createElement('tr');

                const td_competition = document.createElement('td');
                td_competition.className = 'td_table-name';
                const img_competition = document.createElement('img');
                img_competition.src = jogo.competitionImage
                td_competition.append(img_competition)
                td_competition.append(jogo.competitionName)
                tr.append(td_competition);

                const td_date = document.createElement('td')
                td_date.append(jogo.matchDate)
                tr.append(td_date)

                const td_home = document.createElement('td')
                td_home.className = 'td_table-name';
                const img_home = document.createElement('img');
                img_home.src = jogo.homeClubImage
                td_home.append(img_home)
                td_home.append(jogo.homeClubName)
                tr.append(td_home)

                const td_away = document.createElement('td')
                td_away.className = 'td_table-name';
                const img_away = document.createElement('img');
                img_away.src = jogo.awayClubImage
                td_away.append(img_away)
                td_away.append(jogo.awayClubName)
                tr.append(td_away)

                const td_result = document.createElement('td')
                td_result.append(jogo.result)

                tr.append(td_result)



                table_jogos.append(tr)
            })
        });


        //Noticias
        //Noticias
        const base_news_url = "https://newsapi.org/v2/everything?"
        const jornais = '&domains=maisfutebol.iol.pt,ojogo.pt,dn.pt,record.pt,abola.pt'
        var query = "q=" + club + "&sortBy=time" + jornais
        const settings_NEWS = {
            "async": true,
            "crossDomain": true,
            "url": base_news_url + query + '&apiKey=' + credentials.news_api,
            "method": "GET",
        };

        $.ajax(settings_NEWS).done(function(response) {

            var top_noticias = []

            if (response.articles.length >= 6) {
                top_noticias.push(response.articles[0])
                top_noticias.push(response.articles[1])
                top_noticias.push(response.articles[2])
                top_noticias.push(response.articles[3])
                top_noticias.push(response.articles[4])
                top_noticias.push(response.articles[5])
            }
            if (response.articles.length >= 3 && response.articles.length < 6) {
                top_noticias.push(response.articles[0])
                top_noticias.push(response.articles[1])
                top_noticias.push(response.articles[2])
            }

            const row = $("#row");
            top_noticias.map(noticia => {
                const div = document.createElement('div')
                div.className = 'col-4'

                const card = document.createElement('div')
                card.className = 'card'
                card.id = 'card'
                card.onclick = () => { window.open(noticia.url); }
                const card_body = document.createElement('div')
                card_body.className = 'card-body'

                const img = document.createElement('img')
                img.className = 'img_news'
                img.src = noticia.urlToImage
                card_body.append(img)

                const titulo = document.createElement('h4')
                titulo.className = 'titulo_news'
                titulo.append(noticia.title)
                card_body.append(titulo)

                const resumo = document.createElement('h6')
                resumo.className = 'desc_news'
                resumo.append(noticia.description)

                card_body.append(resumo)
                card.append(card_body)
                div.append(card)
                row.append(div)
            })


            /*console.log('asdasdasd')
            $('.loader').hide()
            $('.first-container').show("slow")
            $('.club-game').show("slow")
            $('.news').show("slow") */
        });

        setTimeout(function() {
            $('.loader').hide()
            $('.first-container').show()
            $('.club-game').show()
            $('.news').show()
        }, 3000);


    });

} catch (e) {
    console.log(e)
}