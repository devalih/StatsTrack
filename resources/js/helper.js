function sum(result) {
    if (!result)
        return 0;
    let ans = 0;
    for (let r of result)
        ans += r;
    return ans;
}