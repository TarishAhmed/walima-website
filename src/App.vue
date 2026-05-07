<script setup>
import Hero from './components/Hero.vue';
import Invitation from './components/Invitation.vue';
import EventDetails from './components/EventDetails.vue';
import Countdown from './components/Countdown.vue';
import VenueMap from './components/VenueMap.vue';
import RSVPForm from './components/RSVPForm.vue';
import Footer from './components/Footer.vue';
import RingsScene from './components/RingsScene.vue';
</script>

<template>
  <div class="min-h-screen" style="background-color: var(--color-bg)">
    <Hero />
    <Invitation />
    <EventDetails />
    <Countdown />
    <VenueMap />
    <RSVPForm />
    <Footer />
  </div>
</template>
