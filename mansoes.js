/* Dados das 28 mansões e cálculo da posição da Lua. Compartilhado pela página e pelo service worker. */
var SEG = 360 / 28;
  var SIGNS = ["Áries","Touro","Gêmeos","Câncer","Leão","Virgem","Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"];
  var GLYPHS = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
  var PHASES = ["Lua nova","Crescente","Quarto crescente","Crescente gibosa","Lua cheia","Minguante gibosa","Quarto minguante","Minguante"];

  // [árabe, nome árabe, nome no Picatrix, epíteto, favorece[], desfavorece[], texto, anjo]
  var M = [
    ["الشرطين","Al Sharatain","Alnath","Os Dois Sinais",["Negócios"],[],"Os árabes viam aqui forças em conflito, tanto naturais, como redemoinhos, quanto do dia a dia, como discussões.","Geniel"],
    ["البطين","Al Butani","Albotain","O Ventre",["Comércio","Descoberta de tesouros"],["Viagens por mar"],"Marca o temperamento imprudente de quem se arrisca no que é diferente, sem medir as consequências.","Enediel"],
    ["الثريا","Al Thuraya","Azoraya","O Enxame",["Ciências","Quem vive ao ar livre","Trabalho"],["Casamento","Viagens por água"],"Perfil trabalhador e prático, inclinado às ciências, à economia e à contabilidade.","Amixiel"],
    ["الدبران","Al Debaran","Aldebaran","O Olho de Deus",["Trabalho","Manufatura","Pequeno comércio"],["Imóveis","Construção","Minas"],"Paixões irresistíveis sob uma aparência de boa índole. Pode haver discórdia no lar.","Azariel"],
    ["الهقعة","Al Hakah","Almices","A Mancha Branca",["Vida privada","Estudos","Segunda metade das viagens"],["Empreendimentos coletivos","Obras humanitárias"],"Favorece o estudo e as artes na vida reservada, mais que a exposição pública. Boa para amizades e casamento.","Gabiel"],
    ["الهنعة","Al Hanach","Athaya","A Cicatriz",["Vida social"],["Trabalho agrícola","Trabalho pesado"],"Indica convalescenças lentas e possíveis perdas financeiras ao longo da vida, mas guarda a boa vontade dos outros.","Dirachiel"],
    ["الذراع","Al Dhira","Aldirah","A Semente ou o Galho",["Amor","Amizades","Ganhos","Cura"],["Leis e justiça"],"Amor pela casa e pela família e necessidade de amigos por perto. Pessoa amável, que se contenta com pouco.","Scheliel"],
    ["النثرة","Al Nathrah","Annathra","O Berçário",["Amor e amizade nascidos em viagens"],[],"Forte apego à família e amor pelas crianças, até as dos outros.","Amnediel"],
    ["الطرف","Al Tarf","Atarf","O Olhar",["Casamento (para homens)","Força de personalidade"],["Casamento e felicidade (para mulheres)"],"As fontes divergem. Uma descreve alguém afável e benevolente; outra, mulheres desanimadas e homens de personalidade forte.","Barbiel"],
    ["الجبهة","Al Jabbah","Algebha","A Testa",["Estudos","Ganhos","Amor","Profissão","Defesa contra inimigos"],[],"Sensibilidade aos sentimentos alheios e vida social farta. O risco é o excesso de orgulho e de medicamentos ou drogas.","Ardesiel"],
    ["الزبرة","Al Zubrah","Azobra","A Juba do Leão",["Comércio","Riqueza","Casamento","Viagens"],["Saúde das mulheres"],"A riqueza costuma vir mais pelo esforço de outra pessoa que pelo próprio.","Neciel"],
    ["الصرفة","Al Sarfah","Acarfa","O Mudador do Tempo",["Colheitas","Envio de mensagens","Empregados"],["Marinheiros"],"Só se avança servindo aos outros. Pode-se chegar ao topo, desde que com dedicação ao serviço.","Abdizuel"],
    ["العواء","Al Awwa","Alahue","O Latidor",["Viagens"],[],"Exterior rude que esconde um coração bondoso, com bom discernimento.","Jazeriel"],
    ["السماك","Al Simac","Azimech","O Desarmado",["Marinheiros"],["Viagens por água","Primeiros anos de casamento"],"Pessoa prudente e analítica, interessada em estudos divinatórios. Os atritos do casamento tendem a passar.","Ergediel"],
    ["الغفر","Al Ghair","Argafra","A Tampa",["Descobrir tramas hostis","Buscar tesouros"],["Família e outras relações","Viagens"],"Considerada desfavorável a quase tudo. Só serve a quem quer descobrir planos hostis ou procurar tesouros.","Ataliel"],
    ["الزبانا","Al Jubana","Azubene","As Garras",["Criação de gado","Compra e venda de gado","Especulação"],["Negócios","Casamento","Viagens"],"Quem a tem protege-se pela observação e pelo bom julgamento. A reputação pode sofrer com invejosos.","Azeruel"],
    ["الإكليل","Iktil Al Jabhah","Alichil","A Cúpula da Cabeça",["Casamento","Posição de responsabilidade","Marinheiros"],[],"Permite um bom casamento e um cargo de responsabilidade. Temperamento forte, mas honrado pelos outros.","Adriel"],
    ["القلب","Al Kalb","Alcalb","O Coração",["Expor inimigos","Tempos de guerra"],["Quase todo o resto","Família"],"Favorável ao conflito. A tradição a associa a riscos para a mãe e a laços familiares.","Egibiel"],
    ["الشولة","Al Shaulah","Exaula","O Ferrão",["Caça","Ideias pessoais"],["Comércio","Residência fixa"],"Não favorece uma carreira tranquila nem o apego a um só lugar.","Amutiel"],
    ["النعائم","Al Ras Al Thuban","Nahaym","A Cabeça do Dragão",["Amor","Sucesso pelo próprio mérito","Favor de mulheres","Ligação livre"],["Casamento","Mudança involuntária de residência"],"O parceiro costuma ser útil nos negócios, mas busca autoridade em casa. Mais adequada a uma ligação livre que ao casamento.","Kyriel"],
    ["البلدة","Al Baldah","Elbelda","A Cidade ou o Distrito",["Cura após doença","Viagens","Ganhos"],[],"Pessoa imprudente, suscetível e volúvel. Acelera a recuperação depois de doenças.","Bethnael"],
    ["سعد الذابح","Al Sad Al Dhabih","Caadaldeba","O Assassino Afortunado",["Poder pessoal"],["Casamento","Empréstimos de dinheiro"],"Dá desejo de poder pessoal e a capacidade de escapar das consequências dos próprios atos.","Geliel"],
    ["سعد بلع","Al Sad Al Bulah","Caaddebolach","O Aviador Afortunado",["Médicos","Soldados","Políticos"],["Casamento","Filhos","Contratos"],"Favorece quem lida com saúde, armas e poder. Traz dificuldades conjugais.","Requiel"],
    ["سعد السعود","Al Sa’d Al Su’d","Caadacohot","O Mais Infeliz dos Infelizes",[],["Administrar país ou cidade","Carreiras de alto cargo"],"A tradição vê uma carreira agitada e, no fim, infeliz. Quanto mais alta a posição, mais difícil.","Abrinael"],
    ["سعد الأخبية","Al Sad Al Ahbiyah","Caadalhacbia","A Estrela das Masmorras",["Efeito de remédios"],["Negócios com mulheres","Gravidez"],"No Picatrix, retrata alguém humilde, modesto e temente a Deus, com dificuldades na família e sucesso no exterior.","Aziel"],
    ["الفرغ المقدم","Al Fargh Al Mukdim","Almiquedam","O Orifício Superior do Cântaro",["Casamento","Agricultura","Compra e venda"],["Viagens oceânicas"],"Pode indicar cobiça e desavenças com irmãos.","Tagriel"],
    ["الفرغ المؤخر","Al Fargh Al Thani","Algarf almuehar","O Orifício Inferior do Cântaro",["Casamento","Cargos de responsabilidade"],["Viagens","Imóveis"],"Traz gosto por cavalos, ar livre e festas, mas azar com dinheiro.","Alheniel"],
    ["بطن الحوت","Al Batn Al Hut","Arrexhe","O Ventre do Peixe",["Casamento","Negócios"],["Pessoas doentes","Viagens por mar"],"Pode indicar pobreza e saúde frágil. Às vezes ajuda no momento de perigo.","Amnixiel"]
  ];

  // ---- astronomia ----
  function rad(d) { return d * Math.PI / 180; }
  function norm(d) { d = d % 360; return d < 0 ? d + 360 : d; }
  function T(date) { return (date.getTime() / 86400000 + 2440587.5 - 2451545) / 36525; }
  function moonLon(date) {
    var t = T(date);
    var L = 218.3164477 + 481267.88123421 * t;
    var D = rad(297.8501921 + 445267.1114034 * t);
    var Ms = rad(357.5291092 + 35999.0502909 * t);
    var Mm = rad(134.9633964 + 477198.8675055 * t);
    var F = rad(93.2720950 + 483202.0175233 * t);
    var s = 6.288774 * Math.sin(Mm) + 1.274027 * Math.sin(2 * D - Mm) + 0.658314 * Math.sin(2 * D)
      + 0.213618 * Math.sin(2 * Mm) - 0.185116 * Math.sin(Ms) - 0.114332 * Math.sin(2 * F)
      + 0.058793 * Math.sin(2 * D - 2 * Mm) + 0.057066 * Math.sin(2 * D - Ms - Mm)
      + 0.053322 * Math.sin(2 * D + Mm) + 0.045758 * Math.sin(2 * D - Ms)
      - 0.040923 * Math.sin(Ms - Mm) - 0.034720 * Math.sin(D) - 0.030383 * Math.sin(Ms + Mm)
      + 0.015327 * Math.sin(2 * D - 2 * F) - 0.012528 * Math.sin(Mm + 2 * F)
      + 0.010980 * Math.sin(Mm - 2 * F) + 0.010675 * Math.sin(4 * D - Mm)
      + 0.010034 * Math.sin(3 * Mm) + 0.008548 * Math.sin(4 * D - 2 * Mm)
      - 0.007888 * Math.sin(2 * D + Ms - Mm) - 0.006766 * Math.sin(2 * D + Ms)
      - 0.005163 * Math.sin(D - Mm) + 0.004987 * Math.sin(D + Ms)
      + 0.004036 * Math.sin(2 * D - Ms + Mm) + 0.003994 * Math.sin(2 * D + 2 * Mm)
      + 0.003861 * Math.sin(4 * D) + 0.003665 * Math.sin(2 * D - 3 * Mm);
    return norm(L + s);
  }
  function sunLon(date) {
    var t = T(date);
    var L0 = 280.46646 + 36000.76983 * t;
    var M = rad(357.52911 + 35999.05029 * t);
    return norm(L0 + 1.914602 * Math.sin(M) + 0.019993 * Math.sin(2 * M));
  }
  function mansionAt(ms) { return Math.floor(moonLon(new Date(ms)) / SEG) % 28; }

  function boundary(ms, from, dir) {
    var step = 10 * 60000 * dir, t = ms, i;
    for (i = 0; i < 500; i++) {
      var n = t + step;
      if (mansionAt(n) !== from) {
        var a = t, b = n, k;
        for (k = 0; k < 24; k++) {
          var m = (a + b) / 2;
          if (mansionAt(m) === from) a = m; else b = m;
        }
        return (a + b) / 2;
      }
      t = n;
    }
    return null;
  }

// ---- ajudantes de notificação (usados pela página e pelo service worker) ----
function hm(ms) { return new Date(ms).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }); }
function dm(ms) { return new Date(ms).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }); }

function buildNote(now) {
  var cur = mansionAt(now), m = M[cur];
  var s = boundary(now, cur, -1), e = boundary(now, cur, 1);
  var range = "";
  if (s && e) range = dm(s) === dm(e) ? hm(s) + " - " + hm(e) + " (" + dm(e) + ")" : hm(s) + " (" + dm(s) + ") - " + hm(e) + " (" + dm(e) + ")";
  return {
    idx: cur,
    title: "Mansão " + (cur + 1) + " · " + m[1],
    opts: {
      body: (range ? range + "\n" : "") + m[3],
      tag: "mansao", renotify: true, requireInteraction: true,
      icon: "icon-192.png", badge: "badge-72.png", lang: "pt-BR",
      data: { idx: cur }
    }
  };
}

// pequeno armazenamento compartilhado (o service worker não enxerga localStorage)
function stateGet(k) {
  if (!self.caches) return Promise.resolve(null);
  return caches.open("mansoes-state")
    .then(function (c) { return c.match("/state/" + k); })
    .then(function (r) { return r ? r.text() : null; })
    .catch(function () { return null; });
}
function stateSet(k, v) {
  if (!self.caches) return Promise.resolve();
  return caches.open("mansoes-state")
    .then(function (c) { return c.put("/state/" + k, new Response(String(v))); })
    .catch(function () {});
}
