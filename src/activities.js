// Las líneas alternan entre quien inicia la actividad y su acompañante.
const action=(id,name,energy,hours,pose,lines,replies=[],solo=false)=>({id,name,energy,hours,pose,lines,replies,solo})
export const patio=[
  action('clover','Buscar tréboles',-7,1,'sienta',['Este tiene tres hojas. ¿Lo dejamos crecer?','Sí. Le haré un techito con esta hoja grande.']),
  action('race','Correr hasta el árbol',-18,1,'feliz',['La meta es esa sombra. ¡A la de tres!','¡La sombra se mueve! Esta carrera tiene patas propias.']),
  action('cloud','Inventar nubes',5,1,'siesta',['Esa nube se parece a… ¿qué ves tú?'],[['Un pez con botas','¡Un pez con botas!','Entonces la lluvia serán sus pasitos.'],['Nuestra casita','Nuestra casita, pero con alas.','Si aterriza, le dejamos un cuenco de leche.']]),
  action('seed','Plantar una semilla',-10,2,'sienta',['Voy a enterrarla aquí. ¿Le ponemos un nombre?','Capitana Pepita. La primera en explorar bajo el jardín.']),
  action('leaf','Coleccionar hojas',-4,1,'camina',['Esta hoja parece una orejita. La guardaré en mi rincón.'],[],true),
  action('nap','Tomar el sol',20,1,'siesta',['Solo cierro un ojo… El otro va a vigilar las mariposas.'],[],true)
]
export const casa=[
  action('cookies','Hornear galletitas',-12,2,'feliz',['La receta pide una pizca. ¿Una pizca de qué?','De paciencia. ¡Todavía no metas la patita en el horno!']),
  action('fort','Construir una guarida',-10,2,'camina',['Si sujetas la manta, puedo poner otro cojín.','Listo. Hay sitio para dos y para un secreto pequeñito.']),
  action('paint','Dibujar un retrato',-6,1,'sienta',['Me faltan tus bigotes. ¿Puedes quedarte quieto un segundo?','¡Es que el pincel me hace cosquillas desde aquí!']),
  action('story','Inventar un cuento',-4,1,'sienta',['Había una vez una puerta tan pequeña que solo entraba…'],[['Un suspiro','Un suspiro de puntillas.','Y al otro lado encontró a un bostezo dormido.'],['Una hormiga','Una hormiga con sombrero.','¡Entonces tuvo que quitarse el sombrero para entrar!']]),
  action('read','Leer junto a la ventana',8,1,'sienta',['Este libro tiene una huella de harina por marcapáginas.'],[],true),
  action('sleep','Dormir la siesta',40,3,'siesta',['Un cojín para la cabeza y otro para mis ideas.'],[],true)
]
export const chats=[
  action('hello','Preguntar cómo está',-2,1,'quieta',['¿Qué fue lo mejor de tu día?'],[['Algo pequeñito','Oír crujir la primera galleta.','La próxima la partimos por la mitad.'],['Estar aquí','Este ratito, creo.','Entonces podemos quedarnos un poquito más.']]),
  action('joke','Contar un chiste',-2,1,'feliz',['¿Qué hace un gato con un lápiz?','¿Un autorretrato?','¡Un miau-tógrafo!']),
  action('secret','Compartir un secreto',-3,1,'sienta',['A veces practico mis saludos delante de la ventana.','Con razón el reflejo siempre parece tan contento de verte.']),
  action('date','Preparar una cita',-6,2,'feliz',['He reservado la mejor vista del barrio.','¿El huequito a tu lado?','Ese mismo. Y está libre para ti.'])
]
