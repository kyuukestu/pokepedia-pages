<script setup lang="ts">
import PermitClassCard from '@/components/PermitClassCard.vue'
</script>
<template>
  <v-container class="pa-4" fluid>
    <v-row>
      <v-col cols="12">
        <h2><strong>Definitions</strong></h2>
        <p>
          <strong>"Flying Mount"</strong> refers to any living creature, Pokémon or otherwise,
          capable of carrying human passengers or cargo through the air.
        </p>
        <p>
          <strong>"Private Citizen"</strong> refers to any individual not operating a flying mount
          as part of a commercial, government, or military operation.
        </p>
        <p>
          <strong>"Flight Zone"</strong> refers to the airspace designated for the use of flying
          mounts, which is separate from airspace designated for conventional aircraft.
        </p>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <v-row>
      <v-col cols="12">
        <h2>
          <strong>Guidelines for the Acquisition of Flying Mount Licensing Permits (FMOL)</strong>
        </h2>
      </v-col>
    </v-row>

    <!-- Section 1 -->
    <v-row>
      <v-col cols="12">
        <h3><strong>Section 1: Purpose and Scope</strong></h3>
        <p>
          This document outlines the procedures, requirements, and expectations for individuals
          seeking to obtain an
          <strong>Aviation Permit (AP)</strong> under the authority of the
          <strong>Pokémon League Aviation Authority (PLAA)</strong>.
        </p>
        <p>
          These guidelines apply to all <strong>Private Citizens</strong> who hold a
          <strong>Trainer ID</strong> and to other categories of applicants seeking certification
          for non-commercial, civil aviation using Pokémon.
        </p>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <!-- Section 2 -->
    <v-row>
      <v-col cols="12">
        <h3><strong>Section 2: License Classification</strong></h3>
        <v-container fluid class="Btn-Container mx-auto d-flex flex-row flex-wrap pl-5 pr-5">
          <PermitClassCard
            title="Permit Class A"
            subtitle="Beginner"
            description="This is a description."
            image="https://i.pinimg.com/1200x/b1/ea/09/b1ea09efc831455c6823c883c7ac75a4.jpg"
          />
          <PermitClassCard
            title="Permit Class B"
            subtitle="Intermediate"
            description="This is a description."
            image="https://www.pngplay.com/wp-content/uploads/12/Staravia-Pokemon-Download-Free-PNG.png"
          />
          <PermitClassCard
            title="Permit Class C"
            subtitle="Advanced"
            description="This is a description."
            image="https://static.pokemonpets.com/images/monsters-images-800-800/2398-Shiny-Staraptor.webp"
          />
        </v-container>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <strong>Class C (Basic Permit):</strong> Standard permit. Certifies as capable of both
              day and night-time flights at low-mid altitudes. Standard issue utilized by Trainers.
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <strong>Class B (Intermediate Regional Permit):</strong> Stamina-tested;
              inter-regional flights; suitable for long periods over ocean and weather avoidance.
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <strong>Class A (Advanced Continental Permit):</strong> Extreme altitude and condition
              training; harsh weather search & rescue.
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <p>
          Special Endorsements (e.g., <em>Cargo Transport</em>, <em>Weather Hazard Operation</em>,
          or <em>Aerial Rescue</em>) may be added after additional specialized training.
        </p>
        <p>
          <a href="trainers101.aviation-permit.classifications.md" target="_blank"
            >AV License Classification</a
          >
        </p>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <!-- Section 3 -->
    <v-row>
      <v-col cols="12">
        <h3><strong>Section 3: Eligibility Criteria</strong></h3>
        <h4><strong>Age Requirements</strong></h4>
        <ul>
          <li>Minimum age of <strong>10</strong> for Class C License</li>
          <li>Minimum age of <strong>12</strong> for Class A License</li>
        </ul>

        <h4><strong>Prerequisites</strong></h4>
        <ul>
          <li>✅ Valid Trainer ID</li>
          <li>✅ Flight Capable & Certified Pokémon</li>
          <li>✅ No outstanding flight-related infractions or Pokémon abuse charges</li>
        </ul>

        <h4><strong>Health Clearance</strong></h4>
        <p>
          Applicants must undergo a physical and psychological evaluation. Pokémon companions must
          pass a health and temperament assessment.
        </p>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <!-- Section 4 -->
    <v-row>
      <v-col cols="12">
        <h3><strong>Section 4: Licensing Process</strong></h3>
        <v-list>
          <v-list-item>
            <strong>Step 1: Application Submission</strong> – Submit FMOL application via HPLAA
            portal or authorized Pokémon Center.
          </v-list-item>
          <v-list-item>
            <strong>Step 2: Ground School</strong> – Complete courses on airspace law, safety
            protocols, Pokémon care, radio and IFF operation.
          </v-list-item>
          <v-list-item>
            <strong>Step 3: Practical Flight Training</strong>
            <ul>
              <li><strong>Class C:</strong> 10 hours minimum</li>
              <li><strong>Class B:</strong> 25 hours (incl. night flying)</li>
              <li><strong>Class A:</strong> 50 hours (incl. solo, weather drills)</li>
            </ul>
          </v-list-item>
          <v-list-item>
            <strong>Step 4: Examinations</strong>
            <ul>
              <li><strong>Written:</strong> 80% passing score</li>
              <li><strong>Practical:</strong> Assessed by HPLAA Flight Examiner</li>
            </ul>
          </v-list-item>
          <v-list-item>
            <strong>Step 5: Registration and Certification</strong> – Digital FMOL, Pokémon
            transponder ID, and registry upload.
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <!-- Section 5 -->
    <v-row>
      <v-col cols="12">
        <h3><strong>Section 5: License Validity, Renewal, and Revocation</strong></h3>
        <h4><strong>Validity Period</strong></h4>
        <p>
          FMOLs are valid for <strong>4 years</strong>; Pokémon require health evaluations every 2
          years.
        </p>

        <h4><strong>Renewal Process</strong></h4>
        <ul>
          <li>Refresher course on laws and safety</li>
          <li>Submit updated health clearances</li>
          <li>Simplified flight check if inactive over 2 years</li>
        </ul>

        <h4><strong>Suspension or Revocation</strong></h4>
        <ul>
          <li>Violation of airspace or safety laws</li>
          <li>Neglect or harm to flying mount</li>
          <li>Flying under influence</li>
          <li>Repeated ATC complaints</li>
        </ul>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <!-- Section 6 -->
    <v-row>
      <v-col cols="12">
        <h3><strong>Section 6: Guidelines for Operations</strong></h3>
        <ul>
          <li>Operate only in designated flight zones</li>
          <li>Maintain 500 feet clearance from others</li>
          <li>Equip mounts with night-time lighting</li>
          <li>Use radio and IFF equipment</li>
          <li>Follow ATC instructions</li>
          <li>No operation under influence</li>
          <li>Carry first-aid, comms, emergency gear</li>
          <li>Mounts must broadcast unique ID during flight</li>
        </ul>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <!-- Section 7 -->
    <v-row>
      <v-col cols="12">
        <h3><strong>Section 7: Special Provisions</strong></h3>
        <h4><strong>Juvenile Operators</strong></h4>
        <p>
          Children aged 8-10 may apply for a <strong>Limited Learner Permit</strong> under
          supervision and distance/altitude limits.
        </p>

        <h4><strong>Trainers or Pokémon with Special Needs</strong></h4>
        <p>Custom accommodations for physical, sensory, or medical needs can be requested.</p>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <!-- Section 8 -->
    <v-row>
      <v-col cols="12">
        <h3><strong>Section 8: Prohibited Activities</strong></h3>
        <ul>
          <li>No use of mounts in illegal activity</li>
          <li>No transport of hazardous materials or combat use without approval</li>
          <li>No flying near restricted zones without permission</li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
ul {
  padding-left: 1.5rem;
}

.Btn-Container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  max-width: 950px;
  height: 300px;
}
</style>
