/*Global variables declared here for use in future functions.
Choice is used to remember which cipher the user wishes to use
and word is used to remember the message the user typed for decoding
purposes.*/
var Choice = "KeyPhrase"
var word;

/*This function simply displays the dropdown menu by activating it 
from the CSS code that is used in the aesthetics.css file.*/
function Drop()
{
	document.getElementById("Dropdown").classList.toggle("show");
}

/*The function here simply takes away the dropdown menu when another
part of the site is clicked on. It does this by checking if the current
target clicked on is the dropdown menu and if it isn't, it then removes
each part of the dropdown menu individually.*/
window.onclick = function(event)
{
	if(!event.target.matches(".DropButton")) 
	{
		var dropdowns = document.getElementsByClassName("DropdownMenu");
		var i;
		
		for(i = 0; i < dropdowns.length; i++) 
		{
			var openDropdown = dropdowns[i];			
			if(openDropdown.classList.contains("show")) 
			{
				openDropdown.classList.remove("show");
			}
		}
	}
}

/*All three of these functions do basically the same thing.
Depending on what cipher the user chose to use, the functions
update the variable Choice so that the right cipher can be used
in the next function.*/
function Change1()
{
	Choice = "KeyPhrase";
}

function Change2()
{
	Choice = "Baconian";
}

function Change3()
{
	Choice = "Morse";
}

/*The cipher function here is the main function in this script and
is designed to convert a user typed message into another message which
is deteremined by the cipher chosen. If the variable Choice is set to
"KeyPhrase" the message from "TA1" is then taken in, the message is then stored
in the variable word and two alphabets are then compared to each other where 
whenever a letter from the first alphabet is found in the message the letter 
at that same point in the second alphabet becomes the new letter in the message. 
Once each letter hasbeen converted, the new message is then sent to "TA2" where 
it can then be decoded. The process is the exact same if Choice is set to
"Baconian" or "Morse" except that the second alphabet is different.*/
function Cipher()
{
	if(Choice == "KeyPhrase")
	{
		var str = document.getElementById("TA1").value;
		word = str + "  (" + Choice + ")" + "     Key phrase = THEENDOFTHEWORLDASWEKNOWIT";
		var text1 = str.toLowerCase();
		var cipher = [];
		var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
		var alphabet2 = ['T', 'H', 'E', 'E', 'N', 'D', 'O', 'F', 'T', 'H', 'E', 'W', 'O', 'R', 'L', 'D', 'A', 'S', 'W', 'E', 'K', 'N' ,'O', 'W', 'I', 'T']

		for (var i=0; i < text1.length; i++)
		{
			input = alphabet.indexOf(text1[i]);
			if(input == -1)
			{
				cipher.push(text1[i]);
			}
			else
			{
				var num = (input)%26;
				var letters = alphabet2[num];
				cipher.push(letters);
			}
		}
		document.getElementById("TA2").innerHTML = cipher.join("")
	}
	
	if(Choice == "Baconian")
	{
		var str = document.getElementById("TA1").value;
		word = str + "  (" + Choice + ")" 
 		var text1 = str.toLowerCase();
		var cipher = [];
		var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
		var alphabet2 = ['00000', '00001', '00010', '00011', '00100', '00101', '00110', '00111', '01000', '01001', '01010', '01011', '01100', '01101', '01110', '01111', '10000', '10001', '10010', '10011', '10100', '10101' ,'10110', '10111', '11000', '11001']

		for (var i=0; i < text1.length; i++)
		{
			input = alphabet.indexOf(text1[i]);
			if(input == -1)
			{
				cipher.push(text1[i]);
			}
			else
			{
				var num = (input)%26;
				var letters = alphabet2[num];
				cipher.push(letters);
			}
		}
		document.getElementById("TA2").innerHTML = cipher.join("")
	}
	
	if(Choice == "Morse")
	{
		var str = document.getElementById("TA1").value;
		word = str + "  (" + Choice + ")";
		var text1 = str.toLowerCase();
		var cipher = [];
		var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
		var alphabet2 = ['.-', '-...', '-.-.', '-..', '.', '..-.', '--.', '....', '..', '.---', '-.-', '.-..', '--', '-.', '---', '.--.', '--.-', '.-.', '...', '-', '..-', '...-' ,'.--', '-..-', '-.--', '--..']

		for (var i=0; i < text1.length; i++)
		{
			input = alphabet.indexOf(text1[i]);
			if(input == -1)
			{
				cipher.push(text1[i]);
			}
			else
			{
				var num = (input)%26;
				var letters = alphabet2[num];
				cipher.push(letters);
			}
		}
		document.getElementById("TA2").innerHTML = cipher.join("")
	}
}

/*Function designed to display the users original message entered, before encryption.
Done by adding the variable that saved the users message to the 3rd text area 'TA3'.*/
function Decipher()
{
	document.getElementById("TA3").innerHTML = word;
}

/*This is the function created to play morse code when the second text area has 
the correct text within. This is firstly done by calling upon the webAudio API
which allows the sound we need to be used on the site, we then set the sound to
the correct frequency and continue all the necessary procedures to activate
the sound ability. Once all that is done the text from "TA2" is then taken in 
and split into different letters then, depending on the letter, the code is 
changed from text to sound and outputted to the user. Once every letter has
been converted, the API then shuts down and its value is set to false.*/   
document.getElementById("morse").onsubmit = function() 
{	

	if(Choice == "Morse")
	{
		var Audio = window.AudioContext || window.webkitAudioContext;
		var Sound = new Audio();
		var dot = 1.2 / 15;
	
		var t = Sound.currentTime;

		var morse = Sound.createOscillator();
		morse.type = "sine";
		morse.frequency.value = 600;

		var gainNode = Sound.createGain();
		gainNode.gain.setValueAtTime(0, t);

		this.TA2.value.split("").forEach(function(letter) 
		{
			if(letter == ".")
			{
				gainNode.gain.setValueAtTime(1, t);
				t += dot;
				gainNode.gain.setValueAtTime(0, t);
				t += dot;
			}
			
			else if(letter == "-")
			{
				gainNode.gain.setValueAtTime(1, t);
				t += 3 * dot;
				gainNode.gain.setValueAtTime(0, t);
				t += dot;
			}	
			
			else 
			{
				t += 7 * dot;			
			}
		});

		morse.connect(gainNode);
		gainNode.connect(Sound.destination);

		morse.start();

		return false;
	}
	
	else
	{
		alert("Can only play sound for morse code!");
	}
}

/*The openPage function is used to open the tabs at the top of
the site and load a new page for the user to use. This is done by 
basically just calling upon it and using the variables passed through
it to open the right page, use the correct colours and display it in
the correct format.*/
function openPage(pageName, elmnt, color) 
{

  var i, stuff, tab;
  
  tabcontent = document.getElementsByClassName("stuff");
  for (i = 0; i < tabcontent.length; i++) 
  {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) 
  {
    tablinks[i].style.backgroundColor = "";
  }

  document.getElementById(pageName).style.display = "block";

  elmnt.style.backgroundColor = color;
}

/*This just opens the pahe set as the default when the site is first 
opened (which is the cipher page.)*/
document.getElementById("defaultOpen").click();