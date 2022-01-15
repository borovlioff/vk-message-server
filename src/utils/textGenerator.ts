function textGenerator({text, init}:{text:string, init? : { [key:string]:string  }|undefined }) {
    let textVariations = text.match(/{([^}]+)}/g) || []; // Получение строк между фигурных скобок "{текст|текст2}"
    let variations:any = []; // Вариации
    let keysVariable:any = []; // Переменные

    function Random(arr:Array<string>){
        return arr[Math.floor((Math.random() * arr.length))];
    }
  
    

    textVariations.forEach((combination:string) => {
        let source_text = combination;//исходные текст
            combination = combination.slice(1, -1);//Убираем фигурные скобки 
        let combinations = combination.split(`|`);
        variations.push({
            source_text: source_text,
            combinations: combinations
        });
        //console.log(combinations)
    });

    
    variations.forEach((variation:{ source_text:string, combinations:string[]}) => {
        text = text.replace(variation.source_text, Random(variation.combinations));
    });


    if (init) {
        keysVariable = Object.keys(init.variables);
        for (var i = 0 ; i < keysVariable.length; i++) {
            let key = keysVariable[i];
            text = text.replace("$$" + keysVariable[i] + "$$", init.variables[key])
        }

    }

    return text;
}


export default textGenerator;