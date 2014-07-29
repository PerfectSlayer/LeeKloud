var getFileContent = null,
	open = open;

var Prettydiff = module.exports = {
	hash: null,
	diffs: [],
	compare: function() {
		var arr = [];
		for (var i = 0, file, content; i < 2; i++) {
			file = arguments[i];
			if (typeof(file) == "string") {
				content = getFileContent(file, true);
			} else {
				content = file[0];
				file = "no-path";
			}
			arr[i] = JSON.stringify("// " + file + "\n\n" + content);
		}
		this.diffs.push(arr);
		open("http://127.0.0.1:5012/" + (this.diffs.length - 1));
	},
	load: function() {
		var lk = this.parent;

		getFileContent = lk.getFileContent;
		open = lk.open;

		String.prototype.decompressIA = lk.decompressIA;

		var alphaC = "zyxwvutsrqponmlkjihgfedcba~?>=<:.-,+`;@_^!'][}|{*)(&%";
		var alphabet = "<!doctype hml>\na\tsri=\"/.jqu-210n:wgbvfk68{_,x};$(#)[]";
		var code_de_base = ["zy$x$w$v$u$t$s$rqpuonmlzpuo",
			"nmlzprkxmljzivhgsuqihvfeddvwxrcba~rhtcvwodb",
			"a~rht?>c=c<cog:cb█████████iemzdivhgsumljziv",
			"hgsuqihvfepuusi██.ddhk-c,g██up~+~irhvw:ur:u",
			"cvwod$,~go$xr██`d$,~go$xr`c,██gup~+cgwdokiu",
			"rhdbk`kivhgs█uidsh██ruu██txg;;█cog:cbiemzdi",
			"vhgsumljzng:█@qhrn██feg██vw:eq█utsrfegok,rd",
			"s:,eqphr;fe█puus.d██dgc██go,~hc█vwod`$sb_hu",
			"acs:,eqdmlj█zorukqvpkhirufe~u;?█^emljzugunr",
			"m$nrr$@nw~x█q?q$s█████████hruut█xg;;zdugunr",
			"mlzdprkxmlz+█wxtq█vnk█iif█e-pg█uremlzxg`qgx",
			"feshruutn@em█zdxg█`ml████zivhg█suml`khqkh,i",
			"qfq!ljjiw~hvr██.qe███$g$i'$i██$w$~$h$v$re]l",
			"jjxg;;.qe$g$i'$██x$g$;$;e]██ljjnk:,.qeur[ue",
			"]lj}|l{*e)shruutn█████████@e(&<%cg::rh$p$u$",
			"o$nqfqshruutxg;;*kh,i(|ll$,~go$xr`'$bw~r*(|",
			"lzdivhgsumlzd+wxtmlzdpuonml"
		].join("").decompressIA(alphaC, alphabet);

		var http = require('http');
		http.createServer(function(req, res) {
			var body = code_de_base,
				url = req.url.substr(1);
			console.log("\033[92mPrettydiff : \033[93m" + req.url + "\033[00m");
			res.writeHead(200, {
				"Content-Type": "text/html"
			});

			if (url != "" && Prettydiff.diffs[url]) {
				body = body.replace("\"IS_SOURCE\"", Prettydiff.diffs[url][0]);
				body = body.replace("\"IS_DIFF\"", Prettydiff.diffs[url][1]);
			}

			res.end(body);
		}).listen(5012, "127.0.0.1");
		console.log("\033[92mPrettydiff running at http://127.0.0.1:5012/\033[00m");
	}
};