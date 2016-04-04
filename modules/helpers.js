var qsort = (a, transform) => {
    if (!transform) {
      transform = () => a
    }
    if (a.length == 0) return [];

    var left = [], right = [], pivot = a[0];

    for (var i = 1; i < a.length; i++) {
        transform(a[i]) < transform(pivot) ? left.push(a[i]) : right.push(a[i]);
    }

    return qsort(left, transform).concat(pivot, qsort(right, transform));
}

exports.qsort = qsort;