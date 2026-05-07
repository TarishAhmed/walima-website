<script setup>
const GOOGLE_FORM_URL =
    'https://docs.google.com/forms/d/e/1FAIpQLSf7oRKNCd4sAWE9FhI9CawKAq9DbHvACpulQcLNuYtFK_cIXA/viewform?embedded=true';
</script>

<template>
    <section id="rsvp" class="py-20 md:py-32 px-4" style="background-color: var(--color-bg)">
        <div class="max-w-[640px] mx-auto">
            <h2 class="font-display text-2xl md:text-4xl text-center mb-10 tracking-wider"
                style="color: var(--color-accent)">
                RSVP
            </h2>




            <div class="ornate-border rounded-xl overflow-hidden" style="filter: invert(1);">
                <div style="filter: hue-rotate(189.73deg) saturate(18.61%) brightness(96.86%)">
                    <iframe :src="GOOGLE_FORM_URL" title="RSVP Form" width="100%" height="800" frameborder="0"
                    marginheight="0" marginwidth="0" style="display: block">
                    Loading…
                </iframe>
                </div>
            </div>



            <!-- <div  style="">
                
            </div> -->
        </div>
    </section>
</template>
