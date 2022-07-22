'reach 0.1'
export const main = Reach.App(() => {
    const Alice = Participant('Alice', {
        ready: Fun([], Null)
    })
    const Bobs = API('Bobs', {
        newacc: Fun([], Null)
    })
    init()

    Alice.only(() => {
        interact.ready()
    })
    const amt = 0
    Alice.publish()

    const [num_of_users] =
        parallelReduce([0])
            .invariant(balance() == amt)
            .while(num_of_users < 5)
            .api(Bobs.newacc,
                (k) => {
                    k(null);
                    return [num_of_users + 1];
                })

    commit()
})
