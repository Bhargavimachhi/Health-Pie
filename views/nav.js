var navbar = ` 
        <nav>
            <div>
                <a href="/">
                    <div id="logo">
                        <img src="image.png" alt="Home" />
                    </div>
                    <div>
                        <img src="image.png" alt="Home" />
                    </div>
                    <div id="tagline">
                        <img src="image.png" alt="Home" />
                    </div>
                </a>
            </div>
            <div>
                <a href="/" class="here">
                    Home
                </a>
                <a href="/about.html">About</a>
                <a href="/services.html">Services</a>
                <a href="/pricing.html">Pricing</a>
                <a href="/contact.html">Contact Us</a>
            </div>
        </nav>`;

        // inserting navbar in beginning of body
        document.body.insertAdjacentHTML("afterbegin", navbar);