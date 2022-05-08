<template>
<div>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <h3 class=" h3 text-success fw-bold">Edit Contact</h3>
        <p class="fst-italic">  There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable.</p>
        <p></p>
      </div>
    </div>
  </div>
<div class="container mt-3">
  <div class="row">
    <div class="col-md-4">
      <form @submit.prevent="updateSubmit()">
        <div class="mb-2">
           <input required v-model="contact.name" type="text" class="form-control" placeholder="Name">
        </div>
        <div class="mb-2">
           <input required v-model="contact.photo" type="text" class="form-control" placeholder="Photo URL">
        </div>
        <div class="mb-2">
           <input required v-model="contact.email" type="email" class="form-control" placeholder="Email">
        </div>
        <div class="mb-2">
           <input required v-model="contact.mobile" type="number" class="form-control" placeholder="Mobile">
        </div>
        <div class="mb-2">
           <input required v-model="contact.company" type="text" class="form-control" placeholder="Company">
        </div>
        <div class="mb-2">
           <input required v-model="contact.title" type="text" class="form-control" placeholder="Title">
        </div>
        <div class="mb-2">
          <select v-model="contact.groupId" class="form-control" v-if="groups.length > 0">
            <option :value="groups">Select Group</option>
            <option :value="group.id" v-for="group of groups" :key="group.id">{{group.name}}</option>
          </select>
        </div>
        <div class="mt-4">
           <input type="submit" class="btn btn-success  " value="Update">
        <router-link to="/contacts" class="btn btn-success back"><i class="fa fa-arrow-alt-circle-left"></i> Back</router-link>
        </div>
        
      </form>
    </div>
    <div class="col-md-4">
      <img :src="contact.photo" class="contact-img">
    </div>
  </div>
</div>
  </div>
</template>

<script>
import { ContactService } from '@/services/ContactService'
export default {
  data : function(){
    return{
       contactId : this.$route.params.contactId,
       loading : false,
       contact : {},
       groups : [],
       errorMessage : null
    }
  },
  created : async function(){
  try {
    this.loading = true
    let response = await ContactService.getContact(this.contactId)
    let groupsRespons = await ContactService.getAllGroups()
    this.groups = groupsRespons.data
    this.contact = response.data
    this.loading = false
  } catch (error) {
    this.errorMessage = error
    this.loading = false
    
  }
  },
  methods : {
    updateSubmit : async function(){
   try {
     let response = await ContactService.updateContact(this.contact,this.contactId)
     if(response){
       return this.$router.push("/")
     }
     else{
       return this.$router.push(`/contact/edit/${this.contactId}`)
     }
   } catch (error) {
     console.log(error);
   }
    }
  }

}
</script>

<style>

</style>