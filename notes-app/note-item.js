class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .note {
                    background: white;
                    padding: 10px;
                    border-radius: 5px;
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
                    margin-top: 10px;
                }
                h3 {
                    margin: 0;
                }
                small {
                    color: gray;
                    display: block;
                    margin-bottom: 5px;
                }
                .delete-btn {
                    background-color: red;
                    color: white;
                    padding: 5px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .delete-btn:hover {
                    background-color: darkred;
                }
            </style>
            <div class="note">
                <h3 id="title"></h3>
                <p id="body"></p>
                <small id="date"></small>
                <button class="delete-btn">Hapus</button>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector("#title").textContent = this.getAttribute("title");
        this.shadowRoot.querySelector("#body").textContent = this.getAttribute("body");
        this.shadowRoot.querySelector("#date").textContent = this.getAttribute("date");

        this.shadowRoot.querySelector(".delete-btn").addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("delete-note", {
                detail: this.getAttribute("id"),
                bubbles: true,
                composed: true
            }));
        });
    }
}

customElements.define("note-item", NoteItem);
