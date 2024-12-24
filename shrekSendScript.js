async function enviarScript(scriptText){
	const lines = scriptText.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);
	main = document.querySelector("#main"),
	textarea = main.querySelector(`div[contenteditable="true"]`)
	
	if(!textarea) throw new Error("Não há uma conversa aberta")
	
	for(const line of lines){
		console.log(line)
	
		textarea.focus();
		document.execCommand('insertText', false, line);
		textarea.dispatchEvent(new Event('change', {bubbles: true}));
	
		setTimeout(() => {
			(main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
		}, 100);
		
		if(lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250));
	}
	
	return lines.length;
}

enviarScript(`
SHREK

guuuhhh
Shrek and Fiona kiss...and the kiss fades into...

THE SWAMP

...their wedding kiss. Shrek and Fiona are now married. 'I'm 
a Believer' by Smashmouth is played in the background. Shrek 
and Fiona break apart and run through the crowd to their awaiting 
carriage. Which is made of a giant onion. Fiona tosses her bouquet 
which both Cinderella and Snow White try to catch. But they end 
up getting into a cat fight and so the dragon catches the bouquet 
instead. The Gingerbread man has been mended somewhat and now 
has one leg and walks with a candy cane cane. Shrek and Fiona 
walk off as the rest of the guests party and Donkey takes over 
singing the song.

GINGERBREAD MAN
God bless us, every one.

DONKEY
(as he's done singing and we fade to 
black) Oh, that's funny. Oh. Oh. I can't 
breathe. I can't breathe.

THE END
`).then(e => console.log(`Código finalizado, ${e} mensagens enviadas`)).catch(console.error)
