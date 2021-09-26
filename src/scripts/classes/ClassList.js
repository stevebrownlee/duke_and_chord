import { getClasses } from "../data/ClassStateManager.js"

const container = document.querySelector("#content")

export const ClassList = () => {
    const classes = getClasses()

    return `
        <h2 class="header--centered header--sale">Master Classes</h2>

        <article class="classes">
            ${classes.map(clazz => {
                return `<section class="class" id="class--${clazz.id}">

                        <h2 class="class__title"> ${clazz.title} </h2>
                        <div class="class__description">
                            ${clazz.description.substring(0, 150)}...
                            <a href="#">[more]</a>
                        </div>
                        <div class="class__price">${clazz.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                        <div class="class__musician">With ${clazz.musician.name}</div>
                        <div class="class__date">Starts on ${new Date(clazz.start).toLocaleDateString('en-US')}</div>
                    </section>
                `
            }).join("")}
        </article>
    `
}
