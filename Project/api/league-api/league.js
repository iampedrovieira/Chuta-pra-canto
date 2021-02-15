const urlParams = new URLSearchParams(window.location.search);
const leagueId = urlParams.get('idleague');
const table = $(".table-league")

$('.row').hide()
$('.table-league').hide()

const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.football-data.org/v2/competitions/" + leagueId + "/standings",
    "method": "GET",
    "headers": {
        "X-Auth-Token": credentials.api_football_data_token
    }
};

$.ajax(settings).done(function(response) {
    const table_api = response.standings[0].table

    table_api.map(row => {
        const tr = document.createElement('tr');
        const td_position = document.createElement('td');
        td_position.className = 'td_table-position';
        td_position.append(row.position);
        const td_team = document.createElement('td');
        td_team.className = 'td_table-team';
        const td_team_image = document.createElement('img');

        td_team_image.src = row.team.crestUrl
        td_team.append(td_team_image);
        td_team.append(row.team.name);
        const td_points = document.createElement('td');
        //td_points.className = 'table-cell';
        td_points.append(row.points);
        const td_gamesPlayed = document.createElement('td');
        //td_gamesPlayed.className = 'table-cell';
        td_gamesPlayed.append(row.playedGames);
        const td_wins = document.createElement('td');
        //td_wins.className = 'table-cell';
        td_wins.append(row.won);
        const td_draw = document.createElement('td');
        //td_draw.className = 'table-cell';
        td_draw.append(row.draw);
        const td_lost = document.createElement('td');
        //td_lost.className = 'table-cell';
        td_lost.append(row.lost);
        const td_goals = document.createElement('td');
        //td_goals.className = 'table-cell';
        td_goals.append(row.goalsFor + ":" + row.goalsAgainst);
        const td_form = document.createElement('td');
        const div_formGlobal = document.createElement('div');
        div_formGlobal.className = "form_div"

        //Tratar form
        const games = row.form.split(",")
        games.map(game => {
            const div_form = document.createElement('div')
            if (game == "W") {
                div_form.className = "form_win"
            }
            if (game == "L") {
                div_form.className = "form_lost"
            }
            if (game == "D") {
                div_form.className = "form_draw"
            }
            div_form.append(game)
            div_formGlobal.append(div_form)
        })
        td_form.append(div_formGlobal)


        tr.append(td_position)
        tr.append(td_team)
        tr.append(td_points)
        tr.append(td_gamesPlayed)
        tr.append(td_wins)
        tr.append(td_draw)
        tr.append(td_lost)
        tr.append(td_goals)
        tr.append(td_form)
        table.append(tr);


    })

    //Noticias
    const base_news_url = "https://newsapi.org/v2/everything?"
    const jornais = '&domains=maisfutebol.iol.pt,ojogo.pt,dn.pt,record.pt,abola.pt'
    var query = ""

    switch (leagueId) {
        case '2017':
            query = 'q=Liga NOS&sortBy=time' + jornais
            break;
        case '2021':
            query = 'q=Premier League&sortBy=time' + jornais
            break;
        case '2002':
            console.log('BUNDES');
            query = 'q=bundesliga&sortBy=time' + jornais
            break;
        case '2015':
            query = 'q=Ligue 1&sortBy=time' + jornais
            break;
        case '2019':
            query = 'q=serie a&sortBy=time' + jornais

            break;
        case '2014':
            query = 'q=la liga&sortBy=time' + jornais
            break;
        case '2016':
            query = 'q=championship&sortBy=time' + jornais
            break;
        case '2013':
            query = 'q=campeonato brasileiro&sortBy=time' + jornais
            break;

    }

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

    });





    setTimeout(function() {
        $('.loader').hide()
        $('.row').show()
        $('.table-league').show()

    }, 3000);
});