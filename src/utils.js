/**
 * Center the position and scale it to fit in x3dom screen
 */
function scale_center(positions){
    let count = 0, mean = mean_xyz(positions);
    let min = Math.min.apply(null, positions),
        max = Math.max.apply(null, positions);
    let n = positions.length;
    let newpos = new Float32Array(n);
    for (let i = 0; i < n; i++){
        newpos[i] = 5*(positions[i]-mean[count])/(max-min);
        count = (count +1) % 3;
    }
    return newpos;
}

/**
 * Compute the mean on x, y and z axis on an Float32Array
 */
function mean_xyz(array){
    let len = array.length, mean = [0,0,0], count = 0;
    for (let i=0; i < len; i++ ){
        mean[count] += array[i];
        count = (count +1) % 3;
    }
    return [mean[0]*3/len, mean[1]*3/len, mean[2]*3/len];
}

function getDblSliderFormValues(name, DATA_REAL_MIN, DATA_REAL_MAX){
    let form = new FormData(document.getElementById(name));
    let [min, max] = form.getAll("values");
    let min_val = DATA_REAL_MIN + min*(DATA_REAL_MAX-DATA_REAL_MIN);
    let max_val = DATA_REAL_MIN + max*(DATA_REAL_MAX-DATA_REAL_MIN);
    if (min < max)
        return {"min": min_val , "max": max_val };
    else
        return {"min": max_val , "max": min_val };
}

function getSliderMinMax(name, DATA_REAL_MIN, DATA_REAL_MAX){
    let min = get(name+"1").value, max = get(name+"2").value;
    let min_val = DATA_REAL_MIN + min*(DATA_REAL_MAX-DATA_REAL_MIN);
    let max_val = DATA_REAL_MIN + max*(DATA_REAL_MAX-DATA_REAL_MIN);
    if (min < max)
        return {"min": min_val , "max": max_val };
    else
        return {"min": max_val , "max": min_val };
}

function get(name){ return document.getElementById(name); }
exports.getDblSliderFormValues = getDblSliderFormValues;
exports.getSliderMinMax = getSliderMinMax;
exports.scale_center = scale_center;
exports.get = get;
